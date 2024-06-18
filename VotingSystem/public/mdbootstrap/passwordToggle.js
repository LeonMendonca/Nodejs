document.addEventListener('DOMContentLoaded',function() {
  document.getElementById('password-toggle').addEventListener('click',function() {
    Toggle('password','toggle-icon-pass');
  });

  document.getElementById('conf-password-toggle').addEventListener('click',function() {
    Toggle('conf-password','toggle-icon-conf');
  });
});

function Toggle(passIn, togIc) {
    const passwordInput = document.getElementById(passIn);
    const toggleIcon = document.getElementById(togIc);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

/*
*/
