import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'tel' | 'date' | 'file' | 'textarea' | 'radio';
  label: string;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customError?: string;
  };
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

interface InteractiveFormProps {
  form: {
    sections: FormSection[];
    settings?: {
      submitButtonText?: string;
      successMessage?: string;
    };
  };
  onClose: () => void;
}

export function InteractiveForm({ form, onClose }: InteractiveFormProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentSection = form.sections[currentSectionIndex]

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
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    
    // Clear any existing error for this field
    if (formErrors[fieldId]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const handleNextSection = () => {
    const sectionFields = currentSection.fields
    const newErrors: Record<string, string> = {}

    // Validate current section fields
    sectionFields.forEach(field => {
      const fieldValue = formData[field.id]
      const error = validateField(field, fieldValue)
      if (error) {
        newErrors[field.id] = error
      }
    })

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      return
    }

    // Move to next section or submit
    if (currentSectionIndex < form.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/proxy-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitSuccess(true)
    } catch (error) {
      console.error('Application submission error:', error)
      // Optionally set an error state to show user
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id] || ''
    const error = formErrors[field.id]

    switch (field.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <Input
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case 'textarea':
        return (
          <div className="space-y-2">
            <Textarea
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case 'email':
        return (
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )
      case 'select':
        return (
          <div className="space-y-2">
            <Select 
              value={value}
              onValueChange={(newValue) => handleFieldChange(field.id, newValue)}
            >
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
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              id={field.id}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        )
        case 'number':
            return (
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            )
      
          case 'tel':
            return (
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            )
      
          case 'date':
            return (
              <div className="space-y-2">
                <Input
                  type="date"
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            )
      
          case 'file':
            return (
              <div className="space-y-2">
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
      
          case 'radio':
            return (
              <div className="space-y-2">
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

  if (submitSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
      >
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          {form.settings?.successMessage || 'Application Submitted Successfully!'}
        </h2>
        <Button onClick={onClose} className="mt-6">
          Close
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-6 py-16 relative">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        >
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
            <p className="text-gray-600 mb-6 font-semibold italic border-l-4 border-[--primary] pl-6">{currentSection.description}</p>
          )}

          <div className="space-y-6 mt-8">
            {currentSection.fields.map((field) => (
              <div key={field.id}>
                <Label className="mb-2 font-bold block">{field.label}</Label>
                {renderField(field)}
                {field.helpText && (
                  <p className="text-sm text-gray-500 mt-1">{field.helpText}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-12">
            {currentSectionIndex > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentSectionIndex(prev => prev - 1)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            <Button 
              onClick={handleNextSection}
              className="ml-auto bg-[--primary] hover:bg-[--primary] flex items-center"
            >
              {currentSectionIndex === form.sections.length - 1 
                ? 'Submit' 
                : 'Next'
              }
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InteractiveForm