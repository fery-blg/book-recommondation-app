import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/userStore";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  useEffect(() => {
    user.email && navigate("/");
  }, [user]);
  const [constants] = useState({
    EMAIL_REGEX:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
  });
  const [schema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(constants.EMAIL_REGEX, "Invalid email"),
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(
          constants.PASSWORD_REGEX,
          "Use upper and lower case characters, digits and special character"
        ),
    })
  );
  const loadAndUseLogin = useCallback(
    (email, password) => {
      import("../../services/auth.service")
        .then((module) => {
          module
            .login(email, password)
            .then((res) => {
              if (res && res.data?.user) {
                setUser(res.data.user);
                navigate("/");
                toast.success(
                  `Welcome back ${res.data.user.email.split("@")[0]}`
                );
              }
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        })
        .catch((error) => {
          console.error("Dynamic import failed:", error);
        });
    },
    [setUser, navigate]
  );


  return (
    <div className="w-full p-6 m-auto  rounded-md shadow-xl lg:max-w-xl bg-gradient-to-r   from-purple-50 via-pink100 to-pink-50 duration-500 ">
      <h1 className="text-3xl font-semibold text-center text-black-700 uppercase">
        Log in
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          loadAndUseLogin(values.email, values.password);
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <Field
                className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <Field
                type="password"
                className="block opacity-70 w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
                Forget Password?
              </a> */}
            <div className="mt-6">
              <button
                type="submiit"
                name="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-purple-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
