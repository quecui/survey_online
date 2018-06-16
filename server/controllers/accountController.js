const User = require('../models/user');

function register(req, res) {
	const user = new User({
	  email: req.body.email,
	  username: req.body.username,
	  password: req.body.password,
	})
	user.save(function(err) {
	  if (err) return res.status('505').json({ message: "Email or username is existed"});
	  return res.status('200').json(
		{ 
		  message: 'Success!',
		  dataReq: {token: user._id, username: user.username} 
		});
	})
}

function signin (req, res) {
  User.findOne({username: req.body.username}, (err, user)=>{
    if (err || !user){
      return res.status('404').json({ message: "Username is not exit"});
    } else{
      if (user.password != req.body.password){
        return res.status('404').json({ message: "Password is wrong"});
      }
      return res.status('200').json({ message: 'Success!', dataReq: {token: user._id, username: user.username} });
    }
  })
}

function signinRepeat(req, res) {
  User.findOne({_id: req.body.token}, (err, user) => {
    if (err || !user) {
      return res.status('401').json({message: 'Session Timeout. Please Login'})
    }
    return res.status('200').json({message: 'Success!', dataReq: {username: user.username}})
  })
}

module.exports = {
  register: register,
  signin: signin,
  signinRepeat: signinRepeat
}