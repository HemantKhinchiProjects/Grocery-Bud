import React,{useEffect} from 'react'

function Alert({msg,type,removeAlert, list}) {
    useEffect(() => {
        const timeOut = setTimeout(()=>{
            removeAlert();
        },2000);
        return ()=>clearTimeout(timeOut)
    }, [list]);

  return (
    <p className={`alert alert-${type}`}>
        {msg}
    </p>
  )
}

export default Alert