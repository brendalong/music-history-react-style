<nav class="navbar navbar-expand navbar-dark bg-dark">
   <a class="navbar-brand" href="#">Music React-tion</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mh" aria-controls="navbar-mh" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>

   <div class="collapse navbar-collapse" id="navbar-mh">
      <ul class="navbar-nav mr-auto">
         <li class="nav-item active">
            <Link to="/" className="nav-link">Home<span className="sr-only">(current)</span></Link>
         </li>
         {this.state.authed ?
            <li className="nav-item">
               <Link to="/songs" className="nav-link">Songs</Link>
            </li>
            : null}

         {this.state.authed
            ? <span >
               <li className="nav-item" onClick={() => { this.logoutApp() }} >Logout</button>
               {/* <Redirect to="/songs"/> */}
            </span >
            : <span>
               <div style={{ textAlign: 'right' }}>Sign in to manage your songs</div>

               <li className="nav-item">
                  <Link to="/login">Login</Link>
               </li>
               <li className="nav-item">
                  <Link to="/register" >Register</Link>
               </li>
               <li className="nav-item">
                  <span onClick={() => this.authenticate('google')}>Login Google</span>
               </li>
        </ul>
      </div>
    </nav>