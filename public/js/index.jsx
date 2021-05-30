
class Registration extends React.Component{
    createDesc(){
        return React.createElement('div',{className:'desc'},
        React.createElement('h1',{className:'text-primary JoinUs'},'Join our team now!.')
        )
    }
    render(){
     return(
         <div className='reg-desc'>
             <img src="images/marviskid.jpg"></img>
             <div className='desc'>
                 <h1 className='text-primary JoinUs'>
                     Join our team Now!
                 </h1>
                 <p className='text-muted'>
                     We at the MarvTech are ready to bear all your pain 
                     in building a responsive and user friendly websites. Visit us now!
                 </p>
             </div>
             
         </div>
     )   
    }

}
class LoginForm extends React.Component{
    createField(item, key){
        return (
            <div className='form-input'>
                <label for='name'>{item.fieldName}</label>
                <input type={item.fieldType} key={key} value={item.value}></input>
                <span className="err">{item.err}</span>
            </div>
        )
    }
    render(){
        return React.createElement('form',{className:"form-input"},
        this.props.loginfieldAtrr.map(this.createField)
        )
    }
}
class Regfilable extends React.Component{
    render(){
        const loginfieldAtrr = [{
            fieldName:"Username",
            fieldType:"text",
            placeholder:"Username",
            value:"",
            err:"*Username is required"
        
        },{
            fieldName:"Password",
            fieldType:"password",
            value:"",
            placeholder:"Enter Password",
            err:"*Password is required"
        },
        {
            fieldName:"",
            fieldType:"submit",
            value:"Login",
            placeholder:"",
            err:""
        }

    ]
        return(
        
            <div>
            <div className='this-head'>
               <span className='text-muted loginText' >Login</span>
            </div>
            <div>
            <LoginForm loginfieldAtrr={loginfieldAtrr}/>
            </div>
            </div>
        )
    }

}
//
class Section extends React.Component{
    render(){
        return (
            <section className='registrations'>
                <Registration />
           <div className='reg-fillable'>
                <Regfilable/>
           </div>
            </section>
        )
    }
}

const section = <Section/>;

ReactDOM.render(section,document.getElementById('openSection'));