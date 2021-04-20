//Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '5mpmnFqeHPHUGhhGq1KXeejUEnSYybObUoRw1FoL2CjFZnrmGJruHTlbUxag';

//Exported functionns
module.exports = {
    generateTokenForUser: function(user_id, hostel_id=null, is_admin=null){
        return jwt.sign({
            userId: user_id,
            hostelId: hostel_id,
            isAdmin: is_admin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '744h' 
        })
    },
    parseAuthorization: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserHostel: function(authorization) {
        var user = null;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
          try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null)
              user = jwtToken;
          } catch(err) { }
        }
        return user;
    }
}
