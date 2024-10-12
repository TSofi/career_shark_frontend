import { Button, TextField } from "@mui/material";
import "./registerForm.css";
import LoginIcon from "@mui/icons-material/Login";
import { Formik } from "formik";
import { useCallback, useMemo } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiProvider";
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string;
  nickname: string;
  DoB: string;
  password: string;
};

function RegisterForm() {
  const initialValues = {
    email: "",
    nickname: "",
    DoB: "",
    password: "",
  };

  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      apiClient.register(values).then((response) => {
        if (response.success) {
          navigate("/");
        } else {
        }
      });
    },
    [apiClient, navigate]
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().required(t("loginPage.emailCantBeEmpty")),
        nickname: yup.string().required("nickname can't be empty"),
        DoB: yup.string().required("DoB can't be empty"),
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
              id="registerForm"
              className="login-form"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className="divide_fields">
                <TextField
                  id="email"
                  label={t("Email")}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  className="form-field"
                />
              </div>
              <div className="divide_fields">
                <TextField
                  id="nickname"
                  label={t("Nickname")}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nickname && !!formik.errors.nickname}
                  helperText={formik.touched.nickname && formik.errors.nickname}
                  className="form-field"
                />
              </div>
              <div className="divide_fields">
                <TextField
                  id="DoB"
                  label={t("Date of birth")}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.DoB && !!formik.errors.DoB}
                  helperText={formik.touched.DoB && formik.errors.DoB}
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
                {t("register")}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;