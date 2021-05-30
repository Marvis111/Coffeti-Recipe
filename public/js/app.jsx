
class NavBarLink extends React.Component{
    createLink(item,i){
        return React.createElement('li',{key:i,className:'nav-item'},
        React.createElement('a',{className:'nav-link',href:'#'},
        React.createElement('i',{className:item.textIcon},item.navText)
        )
        )
    }
    render(){
        return React.createElement('div',
        {className:"collapse navbar-collapse justify-content-end",id:'collapsibleNavbar'},
         React.createElement('ul',{className:'navbar-nav'},
        this.props.navlinks.map(this.createLink)
        )
        )
    }
}
class NavToggleButton extends React.Component{
    render(){
        return (
        React.createElement('button',
        {className:'navbar-toggler',type:'button',id:'navToggleBtn',dataToggle:"collapse",dataTarget:"#collapsibleNavbar"}
        ,React.createElement('span',{className:'navbar-toggler-icon'},null)
        )
        )
    }
}
class NavBrand extends React.Component{
    render(){
        return (
            React.createElement('a',{className:'navbar-brand',href:'#'},
            React.createElement('img',{src:'images/bird.jpg',alt:'Logo',style:{width:"40px"}},
            React.createElement('span',null,'INQUISITIVE'))
            )
        )
    }
}

//main nav...
class NavBar extends React.Component{
    
    render(){
      const  navclass = "navbar navbar-expand-md bg-dark navbar-dark",
      navLink = [
          {
            navText:'Login',
            textIcon:"icon-person"
          },
          {
            navText:'Signup',
            textIcon:'icon-group'
          }
      ];
        return (
            <div>
            <nav className={navclass}>

                <NavBrand />
                <NavToggleButton/>
                <NavBarLink navlinks={navLink} />
            </nav>

            </div>
          
        )
    }
}


const navSection = <NavBar/>
ReactDOM.render(navSection,document.getElementById('navSection'));