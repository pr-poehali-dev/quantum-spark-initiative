import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ImageUploader from './ImageUploader'
import ManualInputForm from './ManualInputForm'
import PriceCalculator, { type CalculationData } from './PriceCalculator'
import { Button } from '@/components/ui/button'

export default function CalculatorSection() {
  const [calculationData, setCalculationData] = useState<CalculationData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64 = reader.result as string

        const response = await fetch('https://functions.poehali.dev/ba45247a-a897-4916-a3f5-432214503562', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64 }),
        })

        if (!response.ok) {
          throw new Error('Ошибка обработки изображения')
        }

        const data = await response.json()
        setCalculationData({
          perimeter: data.perimeter,
          area: data.area,
          corners: data.corners,
          chandeliers: data.chandeliers,
          spotlights: data.spotlights,
        })
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError('Не удалось обработать изображение. Попробуйте ввести данные вручную.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleManualSubmit = (data: CalculationData) => {
    setCalculationData(data)
    setError(null)
  }

  const handleReset = () => {
    setCalculationData(null)
    setError(null)
  }

  return (
    <div className="w-full space-y-8">
      {!calculationData ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="upload">Загрузить чертёж</TabsTrigger>
                <TabsTrigger value="manual">Ввести данные</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <ImageUploader onImageUpload={handleImageUpload} isProcessing={isProcessing} />
              </TabsContent>
              <TabsContent value="manual">
                <ManualInputForm onSubmit={handleManualSubmit} />
              </TabsContent>
            </Tabs>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-400 bg-red-900/20 border border-red-700 rounded-lg p-4 max-w-2xl mx-auto"
            >
              {error}
            </motion.div>
          )}
        </>
      ) : (
        <div className="space-y-8">
          <PriceCalculator data={calculationData} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00] hover:text-white"
            >
              Новый расчёт
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
