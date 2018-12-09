import base64 from 'base-64';

export const USER_NAME = 'USER_NAME';
export const userName = (name) => ({
  type: USER_NAME,
  name
})



export const userLogin = (userObj) => dispatch => {
  const userCreds = base64.encode(`${userObj.email.toLowerCase()}:${userObj.password}`)
  return fetch(`/api/user/login`, {
    method: 'POST',
    headers: {
        "Authorization": "Basic " + userCreds,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:userObj.email})
  })
  .then(response => {
    return response.json() 
  })
  .then(json => {
      console.log('returned login obj', json)     
  })
  .catch(err => {
      console.log(" invalid credentials",err)   
  })
}




export const createUser = (userobj) => dispatch => {
   
  fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userobj})
  })
  .then(response => response.json())
  .then(json => {
    if(json){
      // make a login req
      console.log("FROM ACTION",json)
      console.log('Loging in ')
      let loginObj = json;
      loginObj.password = userobj.password
      dispatch(userLogin(loginObj));
    }
  })
  .catch(err => {
    console.log(err);
  })
  
}

