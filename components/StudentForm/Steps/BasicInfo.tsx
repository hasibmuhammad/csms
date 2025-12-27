import { GENDER_OPTIONS } from "@/constants";
import { StudentFormData } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IBasicInfoProps {
  register: UseFormRegister<StudentFormData>;
  errors: FieldErrors<StudentFormData>;
}

const BasicInfo = ({ register, errors }: IBasicInfoProps) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Name</label>
        <input
          {...register("name")}
          type="text"
          className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? "border-red-500 focus:ring-red-500/20"
              : "border-gray-100 focus:ring-blue-500/20"
          }`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-xs text-red-500 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Age</label>
        <input
          {...register("age", { valueAsNumber: true })}
          min={0}
          type="number"
          className={`w-full px-4 py-2.5 bg-gray-50 border rounded focus:outline-none focus:ring-2 transition-all ${
            errors.age
              ? "border-red-500 focus:ring-red-500/20"
              : "border-gray-100 focus:ring-blue-500/20"
          }`}
          placeholder="20"
        />
        {errors.age && (
          <p className="text-xs text-red-500 font-medium">{errors.age.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Gender</label>
        <div className="flex items-center gap-6 pt-1">
          {GENDER_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                {...register("gender")}
                type="radio"
                value={option.value}
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-xs text-red-500 font-medium">
            {errors.gender.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;