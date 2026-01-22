import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { CalculationData } from './PriceCalculator'

interface ManualInputFormProps {
  onSubmit: (data: CalculationData) => void
}

export default function ManualInputForm({ onSubmit }: ManualInputFormProps) {
  const [formData, setFormData] = useState({
    perimeter: '',
    area: '',
    corners: '',
    chandeliers: '',
    spotlights: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      perimeter: parseFloat(formData.perimeter) || 0,
      area: parseFloat(formData.area) || 0,
      corners: parseInt(formData.corners) || 4,
      chandeliers: parseInt(formData.chandeliers) || 0,
      spotlights: parseInt(formData.spotlights) || 0,
    })
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/50 border border-neutral-700 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Ручной ввод данных</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="perimeter" className="text-white">
              Периметр помещения (м)
            </Label>
            <Input
              id="perimeter"
              type="number"
              step="0.1"
              placeholder="15.5"
              value={formData.perimeter}
              onChange={handleChange('perimeter')}
              required
              className="bg-neutral-800 border-neutral-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area" className="text-white">
              Площадь помещения (м²)
            </Label>
            <Input
              id="area"
              type="number"
              step="0.1"
              placeholder="20.5"
              value={formData.area}
              onChange={handleChange('area')}
              required
              className="bg-neutral-800 border-neutral-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="corners" className="text-white">
              Количество углов
            </Label>
            <Input
              id="corners"
              type="number"
              placeholder="4"
              value={formData.corners}
              onChange={handleChange('corners')}
              required
              className="bg-neutral-800 border-neutral-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chandeliers" className="text-white">
              Количество люстр
            </Label>
            <Input
              id="chandeliers"
              type="number"
              placeholder="1"
              value={formData.chandeliers}
              onChange={handleChange('chandeliers')}
              className="bg-neutral-800 border-neutral-600 text-white"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="spotlights" className="text-white">
              Количество точечных светильников
            </Label>
            <Input
              id="spotlights"
              type="number"
              placeholder="8"
              value={formData.spotlights}
              onChange={handleChange('spotlights')}
              className="bg-neutral-800 border-neutral-600 text-white"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white"
          size="lg"
        >
          Рассчитать стоимость
        </Button>
      </form>
    </motion.div>
  )
}
