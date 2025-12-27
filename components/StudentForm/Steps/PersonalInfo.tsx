import { HOBBY_OPTIONS } from "@/constants";
import { StudentFormData } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IPersonalInfoProps {
  register: UseFormRegister<StudentFormData>;
  errors: FieldErrors<StudentFormData>;
}

const PersonalInfo = ({ register, errors }: IPersonalInfoProps) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Hobby</label>
        <select
          {...register("hobby")}
          className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${
            errors.hobby
              ? "border-red-500 focus:ring-red-500/20"
              : "border-gray-100 focus:ring-blue-500/20"
          }`}
        >
          {HOBBY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.hobby && (
          <p className="text-xs text-red-500 font-medium">
            {errors.hobby.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;