# Intasend API

<hr>
 <h1>Getting started:</h1>

<ul>
    <li>Clone this repo
    <li>And install the dependencies using <em>npm</em>
    <li>Have a server ready
    <li>Create an .env file
</ul>

<h2>Installing dependencies:</h2>

```javascript
    npm install
```

<h2>Setting up your .env file:</h2>

```env
    VITE_REACT_API_PAY="<API to your server>"

    VITE_REACT_API_WEB_URL="<Current website domain e.g localhost:5173 or https://domainName for this website>"

```

<hr>

<h1>How It works under the hood: </h1>

<p>
This App accepts an input number from a user and when the form is submited, the phone number is sent to the server and initialises an <em>M-PESA</em> stk push to the target phone number.
</p>

<h2>Why do we use the current website domain as part of .env?</h2>
<p>
This is a security feature from Intasend API, it will only allow requests from a this domain and not any other, hence protecting the app from attacks.
</p>

<hr>
<p>Feel free to moding the code to suit your current needs. HAPPY CODING!</p>
