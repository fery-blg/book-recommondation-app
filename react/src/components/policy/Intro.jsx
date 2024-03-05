import React from "react";

function Intro() {
  return (
    <div>
      {" "}
      <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">About Our Website</h2>
        <p>
          Welcome to our website! We are an open-source project dedicated to
          demonstrating the implementation of a minimal React Express app. Our
          website showcases authentication using JWT refresh tokens and Google
          Auth, with Cloudinary for profile image uploads and Node Mailer for
          email verification.
        </p>
        <p>
          Our project utilizes React with Vite and Express bundled with Webpack,
          with production-ready configurations including sitemaps and other
          necessary configurations.
        </p>
        <p>
          For any inquiries or feedback, please feel free to reach out to us at{" "}
          <a
            className="text-blue-500 hover:underline"
            href="mailto:mouhammedalifaidi@gmail.com"
          >
            mouhammedalifaidi@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Intro;
