import { testAdminRoute } from "../../services/auth.service";
// routes/authors.js
const express = require('express');
const router = express.Router();
;

// Add routes for author management

module.exports = router;
function Admin() {

  return (
    <div>
      <button onClick={testAdminRoute}>admin action</button>
    </div>
  );
}

export default Admin
