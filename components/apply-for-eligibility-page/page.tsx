"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface FormField {
  id: string
  type: "text" | "email" | "number" | "select" | "checkbox" | "tel" | "date" | "file" | "textarea" | "radio"
  label: string
  placeholder?: string
  helpText?: string
  options?: string[]
  required: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
    customError?: string
  }
}

interface FormSection {
  id: string
  title: string
  description?: string
  fields: FormField[]
}

interface EligibilityApplicationFormProps {
  form: {
    sections: FormSection[]
    settings?: {
      submitButtonText?: string
      successMessage?: string
    }
  }
  onClose: () => void
}

export function EligibilityApplicationForm({ form, onClose }: EligibilityApplicationFormProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")
  const [submissionMessage, setSubmissionMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const currentSection = form.sections[currentSectionIndex]

  useEffect(() => {
    formRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [formRef])

  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      const firstErrorField = document.querySelector('[data-has-error="true"]')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [formErrors])

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && !value) {
      return `${field.label} is required`
    }

    if (field.validation) {
      const { minLength, maxLength, pattern } = field.validation

      if (minLength && value.length < minLength) {
        return `${field.label} must be at least ${minLength} characters`
      }

      if (maxLength && value.length > maxLength) {
        return `${field.label} must not exceed ${maxLength} characters`
      }

      if (pattern && !new RegExp(pattern).test(value)) {
        return field.validation.customError || `${field.label} is invalid`
      }
    }

    return null
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))

    if (formErrors[fieldId]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const handleNextSection = async () => {
    setIsLoading(true)
    const sectionFields = currentSection.fields
    const newErrors: Record<string, string> = {}

    sectionFields.forEach((field) => {
      const fieldValue = formData[field.id]
      const error = validateField(field, fieldValue)
      if (error) {
        newErrors[field.id] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      setIsLoading(false)
      return
    }

    if (currentSectionIndex < form.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1)
      setIsLoading(false)
    } else {
      await handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      const formattedFormData = Object.keys(formData).reduce(
        (acc, fieldId) => {
          const field =
            currentSection.fields.find((f) => f.id === fieldId) ||
            form.sections.flatMap((s) => s.fields).find((f) => f.id === fieldId)
          if (field) {
            acc[field.label] = formData[fieldId]
          }
          return acc
        },
        {} as Record<string, any>,
      )

      const response = await fetch("/api/proxy-eligibility-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantName: formData.name || "Unknown",
          formData: formattedFormData,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setSubmissionStatus("success")
      setSubmissionMessage(form.settings?.successMessage || "Eligibility Application Submitted Successfully!")
    } catch (error) {
      console.error("Error submitting eligibility application:", error)
      setSubmissionStatus("error")
      setSubmissionMessage("Failed to submit eligibility application. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id] || ""
    const error = formErrors[field.id]
    const fieldProps = {
      "data-has-error": error ? "true" : "false",
    }

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "tel":
      case "date":
        return (
          <div className="space-y-2" {...fieldProps}>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case "textarea":
        return (
          <div className="space-y-2" {...fieldProps}>
            <Textarea
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case "select":
        return (
          <div className="space-y-2" {...fieldProps}>
            <Select value={value} onValueChange={(newValue) => handleFieldChange(field.id, newValue)}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case "checkbox":
        return (
          <div className="space-y-2" {...fieldProps}>
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={(value as string[])?.includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = (value as string[]) || []
                    const newValues = checked ? [...currentValues, option] : currentValues.filter((v) => v !== option)
                    handleFieldChange(field.id, newValues)
                  }}
                  className={cn(
                    "border-gray-300 text-black focus:ring-black",
                    "checked:bg-black checked:border-black",
                    "data-[state=checked]:bg-black data-[state=checked]:border-black",
                  )}
                />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case "file":
        return (
          <div className="space-y-2" {...fieldProps}>
            <Input
              type="file"
              placeholder={field.placeholder}
              onChange={(e) => {
                const file = e.target.files?.[0]
                handleFieldChange(field.id, file)
              }}
            />
            {value && <p className="text-sm text-gray-600">{(value as File).name}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2" {...fieldProps}>
            <div className="flex flex-col space-y-2">
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${field.id}-${option}`}
                    name={field.id}
                    value={option}
                    checked={value === option}
                    onChange={() => handleFieldChange(field.id, option)}
                    className="form-radio"
                  />
                  <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      default:
        return null
    }
  }

  if (submissionStatus !== "idle") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full text-center">
          {submissionStatus === "success" ? (
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
          ) : (
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
          )}

          <h2
            className={`text-2xl font-bold mb-4 ${submissionStatus === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {submissionMessage}
          </h2>

          <Button
            onClick={onClose}
            className={`mt-6 ${submissionStatus === "success" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            Close
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
      ref={formRef}
    >
      <div className="max-w-2xl mx-auto px-6 py-16 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-600 hover:text-black">
          <X className="w-8 h-8" />
        </button>

        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-2">{currentSection.title}</h2>
          {currentSection.description && (
            <p className="text-gray-600 mb-6 font-semibold italic border-l-4 border-[--primary] pl-6">
              {currentSection.description}
            </p>
          )}

          <div className="space-y-6 mt-8">
            {currentSection.fields.map((field) => (
              <div key={field.id}>
                <Label className="mb-2 font-bold block">{field.label}</Label>
                {renderField(field)}
                {field.helpText && <p className="text-sm text-gray-500 mt-1">{field.helpText}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-12">
            {currentSectionIndex > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentSectionIndex((prev) => prev - 1)}
                className="flex items-center"
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            <Button
              onClick={handleNextSection}
              className="ml-auto bg-[--primary] hover:bg-[--primary] flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {currentSectionIndex === form.sections.length - 1 ? "Submitting..." : "Loading..."}
                </>
              ) : (
                <>
                  {currentSectionIndex === form.sections.length - 1 ? "Submit" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EligibilityApplicationForm

