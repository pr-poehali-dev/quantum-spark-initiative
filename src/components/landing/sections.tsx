import { Badge } from "@/components/ui/badge"
import CalculatorSection from "@/components/ceiling/CalculatorSection"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-white border-white">Быстрый расчёт</Badge>,
    title: "Натяжные потолки. Рассчитайте стоимость за 60 секунд.",
    showButton: true,
    buttonText: 'Начать расчёт'
  },
  {
    id: 'about',
    title: 'Как это работает?',
    content: 'Загрузите фото рукописного чертежа помещения — наш ИИ автоматически распознает размеры, углы, светильники и рассчитает точную стоимость монтажа.'
  },
  {
    id: 'calculator',
    title: 'Калькулятор стоимости',
    content: 'Загрузите чертёж или введите данные вручную для расчёта.',
    component: <CalculatorSection />
  },
  {
    id: 'pricing',
    title: 'Прозрачные цены',
    content: 'Монтаж профиля 280₽/м, полотна 400₽/м², плинтуса 100₽/м, точечные светильники 450₽/шт, люстры 1000₽/шт. Углы более 4х — 450₽/шт.'
  },
  {
    id: 'contact',
    title: 'Готовы начать?',
    content: 'Получите расчёт за минуту и закажите монтаж натяжного потолка у профессионалов.',
    showButton: true,
    buttonText: 'Рассчитать стоимость'
  },
]