import { useForm } from "react-hook-form";

export function Validation() {
  const {
    register,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  return { register, reset, setValue, watch, handleSubmit, errors, isValid };
}

 

 export function checkError(error) {
    if (error === "name") {
      const errorName = {
        type: String,
        required: "Обязательное поле",
        minLength: { value: 2, message: "минимально два символа" },
        pattern: {
          value: /^[a-zA-Zа-яА-Я0-9 -]+$/u,
          message: "некорректные символы",
        },
      };

      return errorName;
    }
    if (error === "email") {
      const errorName = {
        type: String,
        required: "Обязательное поле",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
          message: "некорректный имейл",
        },
      };

      return errorName;
    }
    if (error === "password") {
      const errorName = {
        type: String,
        required: "Обязательное поле",
        minLength: { value: 2, message: "минимально два символа" },
        pattern: { value: /^\S*$/, message: "некорректные символы" },
      };

      return errorName;
    }
  }
