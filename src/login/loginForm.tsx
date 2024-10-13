import { Button, TextField } from "@mui/material";
import "./loginForm.css";
import LoginIcon from "@mui/icons-material/Login";
import { Formik } from "formik";
import { useCallback, useMemo } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiProvider";
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const initialValues = { email: "", password: "" };

  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate("/game");
        } else {
          formik.setFieldError(
            "password",
            t("loginPage.invalidEmailOrPassword")
          );
        }
      });
    },
    [apiClient, navigate, t]
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().required(t("loginPage.emailCantBeEmpty")),
        password: yup
          .string()
          .required(t("loginPage.passwordCantBeEmpty"))
          .min(5, t("loginPage.passwordMustBeAtLeast5Characters")),
      }),
    [t]
  );

  return (
    <div className={"login_wrap"}>
      <div className="login-page">
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {(formik: any) => (
            <form
              id="loginForm"
              className="login-form"
              onSubmit={formik.handleSubmit}
              noValidate
            >
                <div className="divide_fields">
              <TextField
                id="email"
                label={t("email")}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                className="form-field"
              />
                </div>
              <TextField
                id="password"
                label={t("password")}
                variant="outlined"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                className="form-field"
              />
              <Button
                variant="outlined"
                startIcon={<LoginIcon />}
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {t("login")}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;