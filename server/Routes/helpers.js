module.exports = {
  getAllUrlParams: url => {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];

      // split our query string into its component parts
      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');

        // in case params look like: list[]=thing1&list[]=thing2
        var paramNum = undefined;
        var paramName = a[0].replace(/\[\d*\]/, function(v) {
          paramNum = v.slice(1, -1);
          return '';
        });

        // set parameter value (use 'true' if empty)
        var paramValue = typeof a[1] === 'undefined' ? true : a[1];

        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        paramValue = paramValue.toLowerCase();

        // if parameter name already exists
        if (obj[paramName]) {
          // convert value to array (if still string)
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = [obj[paramName]];
          }
          // if no array index number specified...
          if (typeof paramNum === 'undefined') {
            // put the value on the end of the array
            obj[paramName].push(paramValue);
          } else {
            // if array index number specified...
            // put the value at that index number
            obj[paramName][paramNum] = paramValue;
          }
        } else {
          // if param name doesn't exist yet, set it
          obj[paramName] = paramValue;
        }
      }
    }

    return obj;
  },

  ensureAuthenticated: (req, res, next) => {
    console.log(req.body);
    if (req.user) {
      next();
    } else {
      res.redirect('http://localhost:3000/login');
    }
  }
};
