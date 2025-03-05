const info = (...params) => {
    if(process.envNODE_ENV !== 'test'){
       console.log(...params)
    }
   
  }
  
  const error = (...params) => {
    if(process.envNODE_ENV !== 'test'){
      console.log(...params)
   }
  }
  
  module.exports = {
    info, error
  }