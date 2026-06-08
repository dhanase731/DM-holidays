(function () {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  var phoneRegex = /^[0-9+\s-]{7,}$/;
  var userKey = 'dmh_user';

  function getErrorEl(id) {
    return document.querySelector('[data-error-for="' + id + '"]');
  }

  function setError(input, message) {
    var errorEl = getErrorEl(input.id);
    if (errorEl) {
      errorEl.textContent = message;
    }
    input.classList.add('is-invalid');
  }

  function clearError(input) {
    var errorEl = getErrorEl(input.id);
    if (errorEl) {
      errorEl.textContent = '';
    }
    input.classList.remove('is-invalid');
  }

  function showMessage(el, message, isSuccess) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('auth-success', !!isSuccess);
  }

  function isValidEmail(value) {
    return emailRegex.test(value);
  }

  function isValidPassword(value) {
    return passwordRegex.test(value);
  }

  function attachClearOnInput(inputs) {
    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        clearError(input);
      });
    });
  }

  function handleSignup() {
    var form = document.getElementById('signupForm');
    if (!form) return;

    var nameInput = document.getElementById('signupName');
    var emailInput = document.getElementById('signupEmail');
    var phoneInput = document.getElementById('signupPhone');
    var passwordInput = document.getElementById('signupPassword');
    var confirmInput = document.getElementById('signupConfirm');
    var messageEl = document.getElementById('signupMessage');

    attachClearOnInput([
      nameInput,
      emailInput,
      phoneInput,
      passwordInput,
      confirmInput
    ]);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      showMessage(messageEl, '', false);

      var hasError = false;
      var nameValue = nameInput.value.trim();
      var emailValue = emailInput.value.trim();
      var phoneValue = phoneInput.value.trim();
      var passwordValue = passwordInput.value.trim();
      var confirmValue = confirmInput.value.trim();

      if (!nameValue) {
        setError(nameInput, 'Please enter your full name.');
        hasError = true;
      }

      if (!isValidEmail(emailValue)) {
        setError(emailInput, 'Enter a valid email address.');
        hasError = true;
      }

      if (!phoneRegex.test(phoneValue)) {
        setError(phoneInput, 'Enter a valid phone number.');
        hasError = true;
      }

      if (!isValidPassword(passwordValue)) {
        setError(
          passwordInput,
          'Password must be 8+ chars with letters and numbers.'
        );
        hasError = true;
      }

      if (confirmValue !== passwordValue || !confirmValue) {
        setError(confirmInput, 'Passwords do not match.');
        hasError = true;
      }

      if (hasError) return;

      var user = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue
      };

      try {
        var payload = JSON.stringify(user);
        localStorage.setItem(userKey, payload);
        sessionStorage.setItem(userKey, payload);
        showMessage(messageEl, 'Account created! You can now log in.', true);
        form.reset();
      } catch (err) {
        showMessage(messageEl, 'Unable to save your details. Try again.', false);
      }
    });
  }

  function handleLogin() {
    var form = document.getElementById('loginForm');
    if (!form) return;

    var emailInput = document.getElementById('loginEmail');
    var passwordInput = document.getElementById('loginPassword');
    var rememberInput = form.querySelector('input[type="checkbox"]');
    var messageEl = document.getElementById('loginMessage');

    attachClearOnInput([emailInput, passwordInput]);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      showMessage(messageEl, '', false);

      var hasError = false;
      var emailValue = emailInput.value.trim();
      var passwordValue = passwordInput.value.trim();

      if (!isValidEmail(emailValue)) {
        setError(emailInput, 'Enter a valid email address.');
        hasError = true;
      }

      if (!isValidPassword(passwordValue)) {
        setError(
          passwordInput,
          'Password must be 8+ chars with letters and numbers.'
        );
        hasError = true;
      }

      if (hasError) return;

      var stored = localStorage.getItem(userKey) || sessionStorage.getItem(userKey);
      if (!stored) {
        showMessage(messageEl, 'No account found. Please sign up first.', false);
        return;
      }

      var user = JSON.parse(stored || '{}');
      if (user.email !== emailValue || user.password !== passwordValue) {
        showMessage(messageEl, 'Email or password is incorrect.', false);
        return;
      }

      localStorage.setItem('dmh_logged_in', 'true');
      sessionStorage.setItem('dmh_logged_in', 'true');
      showMessage(messageEl, 'Login successful! Welcome back.', true);
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    handleSignup();
    handleLogin();
  });
})();
