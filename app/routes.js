var dir = require('node-dir');
var idps = require(__dirname+"/lib/idps.json");
var verifyRoot = process.env.VERIFY_ROOT || "http://localhost:3000";
var request = require("request");
var marked = require("marked");
var queryString = require("query-string");
var dbURL = 'http://govuk-verify-db.herokuapp.com/prototypes/test';


var userInfo = process.env.USER_INFO;

if (userInfo){
  userInfo = JSON.parse(userInfo);
} else {
 userInfo = require(__dirname+"/lib/user.json");
}

//var NotifyClient = require('notifications-node-client').NotifyClient;

//console.log(process.env.NOTIFYAPIKEY);
//notifyClient = new NotifyClient(process.env.NOTIFYAPIKEY);

console.log("Verify root: " + verifyRoot);

module.exports = {
  bind : function (app) {

    function getServices(callback){

      console.log("get services data");

      request(dbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          services = JSON.parse(body);

          callback();

        } else {
          callback(error);
        }
      });

    };

    function getService(req){

      var requestId = "passport";

      if (req.query){

        // request object

        requestId = req.query.requestId ;

      } else {

        // string

        requestId = req;

      }

      console.log("getService("+requestId+")");

      return services[requestId];
      
    };

    //////// PROTOTYPE AUTH ////////

    // app.get('/prototype-sign-in', function(req, res){
      
    //   res.render('prototype-sign-in', {path: req.query.path})
    // })

    // app.get('/prototype-sign-out', function(req, res){
    //   delete req.session.signedIn
    //   res.render('prototype-sign-out')
    // })

    // app.post('/prototype-sign-in', function(req, res){
      
    //   if (req.body.password == "jolly-roger"){
    //     req.session.signedIn = true
    //     res.redirect(req.body.path)
    //   } else {
    //     res.redirect('/prototype-sign-in?path='+encodeURIComponent(req.body.path))
    //   }
    // })


    app.use(function (req, res, next) {

    //   // Prototype authentication

    //   if (req.body.password == "jolly-roger"){
    //     req.session.signedIn = true
    //   }

    //   if (req.session.signedIn != true){
    //     res.redirect('/prototype-sign-in?path='+encodeURIComponent(req.originalUrl))
    //     return
    //   }

      var requestId = req.query.requestId || "dvla";
      var request = req.query.request || "2";

      getServices(function(error){

        if (error){
          req.status(500).send(error);
          return;
        }

        var service = getService(requestId);
        

        if (!service){
          res.status(404).send("Service not found");
          return;
        }

        res.locals.formData = "";
        res.locals.formQuery = "?";
        res.locals.formHash = {};

        for (var name in req.query){
          var value = req.query[name];
          res.locals.formHash[name] = value;
          res.locals.formData += '<input type="hidden" name="'+name+'" value="' + value + '">\n';
          res.locals.formQuery += name + "=" + value + "&";
        }

        res.locals.formQuery = res.locals.formQuery.slice(0,-1);

        res.locals.requestId = requestId;
        res.locals.request = request;
        res.locals.serviceName = service.name;
        res.locals.serviceLOA = service.LOA;
        res.locals.serviceAcceptsLOA1 = (service.LOA == "2,1");
        res.locals.userLOAis2 = (req.query.userLOA == "2");
        res.locals.validation = req.query.validation;
        res.locals.serviceNameLower = service.name[0].toLowerCase() + service.name.substring(1);
        res.locals.serviceProvider = service.provider;
        res.locals.serviceOtherWays = (service.otherWays) ? marked(service.otherWays) : "";

        if (req.query.idp){
          res.locals.idpSlug = req.query.idp;
          res.locals.idpName = idps[req.query.idp];
        }

        res.locals.action = req.query.action || "register";
        res.locals.verifyRoot = verifyRoot;
        res.locals.userInfo = userInfo;
        res.locals.isRegister = res.locals.action == "register";

        var path = (req.url);

        var pathParts = path.split('/');

        var idpSlug = "idp";

        if (pathParts.length > 2){

          idpSlug = pathParts[1];

        } else if (path != "/"){

          res.redirect("/idp"+path);
          return;

        }

        res.locals.idp = idps[idpSlug];
        res.locals.idpSlug = idpSlug;
        res.locals.baseURL = "/" + idpSlug;

        res.locals.useGOVUKTemplate = (idpSlug == "govuk");

        next();

      });

    });

    var listing = function (req, res){
      
      // Create a view data object
      var viewData = {};
      viewData.files = [];
      viewData.title = [];

      dir.readFiles(__dirname+"/views/", {
        match: /.html$/,
        exclude: ['template.html', 'layout.html', 'listing.html', 'test-form-page.html'],
        excludeDir: ['examples', 'includes'],
      },
      function(err, content, filename, next) {
        if (err) throw err;
        var file = {};
        file.path = filename.split("/views/").pop().replace(".html", "");
        file.name = file.path.replace(/-/g, " ");
        viewData.files.push(file);
        next();
      },
      function(err, files){
        if (err) throw err;
        // Callback to render page
        res.render('listing', viewData);
      });
    };

    app.get('/favicon.ico', function(req,res){

      res.send(200);

    });

    app.get('/', listing);
    app.get('/govuk', listing);

    app.post('/:idp/verify', function(req, res){

      res.redirect('/' + req.params.idp + "/sign-up" + res.locals.formQuery);
    });

    app.get('/:idp/verify', function(req, res){

      res.redirect('/' + req.params.idp + "/sign-up" + res.locals.formQuery);
    });


    app.get('/:idp/verify', function(req, res){

      res.redirect('/' + req.params.idp + "/sign-up" + res.locals.formQuery);
    });


    // Send data to page
    app.get('/:idp', function (req, res) {


      res.redirect('/' + req.params.idp + "/intro-app?idp=" + req.params.idp);
    });


    // Send data to page
    app.get('/:idp/standalone-intro-1', function (req, res) {

        var data = {};
        data.services = services

      res.render("standalone-intro-1", data);
    });


    // SENDING DATA FOR NOTIFY 
    //app.post('/:idp/security-code', function(req, res){

      //notifyClient.sendSms("5c179906-df50-44c9-b42e-f71de4c26b50", req.body.mobileNumber);
      //res.redirect('/' + req.params.idp + '/security-code-2?' + queryString.stringify(req.body));
    // }

    //});


    // Sending data to page
    app.get('/:idp/sign-in-eidas', function (req, res) {

      var query = req.query;
      country = query.country

      res.render("sign-in-eidas", query);
    });


    // Sending data to page
    app.get('/:idp/create-account', function (req, res) {

      var query = req.query;
      idp = query.idp

      res.render("create-account", query);
    });


    // Routing for recognised emails - if usersIdp = idp
    app.get('/:idp/email-recognised', function(req, res){    

      var query = req.query
      
      if ((query.usersIdp1 != query.idp) && (query.usersIdp2 != query.idp)){
        res.redirect('/' + req.params.idp + "/input-new-password" + res.locals.formQuery);
      } else {
        res.render('email-recognised', query);
      }
    });


    // Routing for Barclays specific sign-in journey
    app.get('/:idp/input-password', function(req, res){    

      var query = req.query
            
      if (query.idp == 'barclays'){
        res.redirect('/' + req.params.idp + "/barclays-signin-1" + res.locals.formQuery)
      } else {
        res.render('input-password', query);
      }
 
    });


    app.post('/:idp/sign-in', function(req, res){
      res.redirect('/' + req.params.idp + "/sign-in" + res.locals.formQuery);
    });



    // Sending data to page
    app.get('/:idp/sign-in', function (req, res) {

        var data = {};
        data.services = services
        data.query = req.query;

      res.render("sign-in", data);
    });


    
  }
};
