import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  isProcessing?: boolean
}

export default function ImageUploader({ onImageUpload, isProcessing = false }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageUpload(file)
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 transition-colors',
          dragActive ? 'border-[#FF4D00] bg-[#FF4D00]/10' : 'border-neutral-600 bg-neutral-900/50',
          isProcessing && 'opacity-50 pointer-events-none'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isProcessing}
        />

        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-lg"
            />
            <Button
              variant="outline"
              onClick={onButtonClick}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Обработка...' : 'Загрузить другой чертёж'}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-neutral-400" />
            </div>
            <div>
              <p className="text-xl font-medium text-white mb-2">
                Загрузите чертёж помещения
              </p>
              <p className="text-sm text-neutral-400">
                Перетащите изображение или нажмите для выбора
              </p>
            </div>
            <Button
              variant="outline"
              onClick={onButtonClick}
              disabled={isProcessing}
              className="mt-4"
            >
              Выбрать файл
            </Button>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center text-sm text-neutral-500"
      >
        Поддерживаются форматы: JPG, PNG, HEIC
      </motion.div>
    </div>
  )
}
