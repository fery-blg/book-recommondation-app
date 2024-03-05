import { Formik, Form, Field } from "formik";
import { lazy, Suspense, useState, useCallback } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";

import LoadingFallback from "../../layouts/Loading";
const Password = lazy(() => import("./Password"));
function Email({ iscode, username, email }) {
  const [EMAIL_REGEX] = useState(
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const [userEmailSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(EMAIL_REGEX, "Invalid email"),
      username: Yup.string()
        .required("Please enter a username")
        .min(6, "username must have at least 6 characters"),
    })
  );
  const emailHandler = useCallback(
    async (username, email) => {
      import("../../../services/auth.service")
        .then((module) => {
          module
            .sendEmail(username, email)
            .then((res) => {
              if (res?.response?.data) toast.error(res.response.data.message);
              toast.success("verification code sent to : " + email);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        })
        .catch((error) => {
          console.error("Dynamic import failed:", error);
        });
    },
    [toast]
  );

  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          username: "",
          email: "",
        }}
        validationSchema={userEmailSchema}
        onSubmit={async (values) => {
          await emailHandler(values.username, values.email);
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6">
            {!iscode ? (
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Username
                </label>
                <Field
                  className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="username"
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
              </div>
            ) : (
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Username
                </label>
                <Field
                  disabled={true}
                  className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="usernameholder"
                  value={username}
                />
              </div>
            )}

            {!iscode ? (
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <Field
                  disabled={iscode}
                  type="email"
                  className="block opacity-70 w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
            ) : (
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <Field
                  value={email}
                  disabled={true}
                  type="email"
                  className="block opacity-70 w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="emailholder"
                />
              </div>
            )}
            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
        Forget Password?
      </a> */}
            <div className={iscode ? "invisible" : "mt-6"}>
              <button
                type="submit"
                name="submit"
                className={
                  iscode
                    ? "invisible"
                    : "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                }
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {iscode && (
        <Suspense fallback={<LoadingFallback />}>
          <Password email={email} username={username} />
        </Suspense>
      )}
    </div>
  );
}

export default Email;
