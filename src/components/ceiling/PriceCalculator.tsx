import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface CalculationData {
  perimeter: number
  area: number
  corners: number
  chandeliers: number
  spotlights: number
}

interface PriceCalculatorProps {
  data: CalculationData
}

const PRICES = {
  profile: 280,
  canvas: 400,
  plinth: 100,
  cornerExtra: 450,
  chandelier: 1000,
  spotlight: 450,
}

export default function PriceCalculator({ data }: PriceCalculatorProps) {
  const items = [
    {
      name: 'Монтаж профиля',
      unit: 'м',
      quantity: data.perimeter,
      price: PRICES.profile,
    },
    {
      name: 'Монтаж полотна',
      unit: 'м²',
      quantity: data.area,
      price: PRICES.canvas,
    },
    {
      name: 'Монтаж микро-плинтуса',
      unit: 'м',
      quantity: data.perimeter,
      price: PRICES.plinth,
    },
  ]

  if (data.corners > 4) {
    items.push({
      name: 'Обход углов более 4х',
      unit: 'шт',
      quantity: data.corners - 4,
      price: PRICES.cornerExtra,
    })
  }

  if (data.chandeliers > 0) {
    items.push({
      name: 'Монтаж люстры',
      unit: 'шт',
      quantity: data.chandeliers,
      price: PRICES.chandelier,
    })
  }

  if (data.spotlights > 0) {
    items.push({
      name: 'Монтаж точечных светильников',
      unit: 'шт',
      quantity: data.spotlights,
      price: PRICES.spotlight,
    })
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Расчет стоимости натяжного потолка</h3>
      
      <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-700 hover:bg-neutral-800/50">
              <TableHead className="text-neutral-400 w-12">№</TableHead>
              <TableHead className="text-neutral-400">Название</TableHead>
              <TableHead className="text-neutral-400 text-right">Ед. изм.</TableHead>
              <TableHead className="text-neutral-400 text-right">Кол-во</TableHead>
              <TableHead className="text-neutral-400 text-right">Цена</TableHead>
              <TableHead className="text-neutral-400 text-right">Сумма</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index} className="border-neutral-700 hover:bg-neutral-800/50">
                <TableCell className="text-white">{index + 1}</TableCell>
                <TableCell className="text-white font-medium">{item.name}</TableCell>
                <TableCell className="text-neutral-400 text-right">({item.unit})</TableCell>
                <TableCell className="text-white text-right">
                  {item.quantity.toFixed(item.unit === 'м²' || item.unit === 'м' ? 1 : 0)}
                </TableCell>
                <TableCell className="text-neutral-400 text-right">{item.price} ₽</TableCell>
                <TableCell className="text-white text-right font-medium">
                  {(item.quantity * item.price).toFixed(0)} ₽
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800">
              <TableCell colSpan={5} className="text-white font-bold text-lg">
                Итого
              </TableCell>
              <TableCell className="text-white font-bold text-lg text-right">
                {total.toFixed(0)} ₽
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
