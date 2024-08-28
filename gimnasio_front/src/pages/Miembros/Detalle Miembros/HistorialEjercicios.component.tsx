import React, { useState } from 'react'
import Card, { CardBody, CardHeader, CardTitle } from '../../../components/ui/Card'
import Label from '../../../components/form/Label'
import Validation from '../../../components/form/Validation'
import FieldWrap from '../../../components/form/FieldWrap'
import Input from '../../../components/form/Input'
import { RootState } from '../../../store/rootReducer'
import { useAppSelector } from '../../../store'
import useColorApp from '../../../hooks/useColorApp'
import Modal, { ModalBody, ModalHeader } from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import Chart, { IChartProps } from '../../../components/Chart'
import colors from 'tailwindcss/colors';
import TablaHistoricaEjercicio from './TablaHistoricaEjercicio.table'
import MuscleCanvas from '../../../components/MuscleApi'

import imageUrl from '/src/assets/MuscleApi.png'; // Asegúrate de colocar la ruta correcta a tu imagen

const HistorialEjercicios = () => {
  const { miembro } = useAppSelector((state: RootState) => state.miembro.miembro)
  const [openModalPreferences, setOpenModalPreferences] = useState(false)
  const { colorApp } = useColorApp()
  const bordeColor = colorApp && colorApp === 'amber' ? '#F59E0B' : colorApp === 'emerald' ? '#059669' : colorApp

  const data = {
    attendanceCount: [7, 3], // 7 días asistió, 3 días no asistió
    labels: ['Asistió', 'No Asistió']
  };

  const chartOptions: IChartProps['options'] = {
    chart: {
      id: 'attendance-pie-chart',
      type: 'pie',
    },
    labels: data.labels,
    colors: ['#3B82F6', '#EF4444'], // Tailwind's blue-500 and red-500
    legend: {
      position: 'bottom',
      labels: {
        colors: '#6B7280', // Tailwind's zinc-500
      },
    },
    title: {
      text: 'Distribución de Asistencia',
      align: 'center',
      style: {
        fontSize: '20px',
        color: '#6B7280', // Tailwind's zinc-500
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const chartSeries: IChartProps['series'] = data.attendanceCount;



  const musclesData = [
    {
        name: 'biceps',
        path: 'M 180 175 C 235 145, 205 115, 260 130 Q 285 134 263 180 Q 250 220 182 175 Z',
        controlPoints: [
            { x: 100, y: 200 },
        ],
        controlColor: 'green'
    },
    {
      name: 'triceps',
      path: 'M 380 175 L 370 175 C 286 245 250 140 276 127',
      controlPoints: [
        {
          x: 215,
          y: 155
        }
      ],
    }
    // Puedes añadir más músculos aquí
];

  const handleMuscleClick = (muscleName: string) => {
      console.log(`Músculo clicado: ${muscleName}`);
  };

  const handleMuscleHover = (muscleName: string | null) => {
      console.log(`Músculo en hover: ${muscleName}`);
  };


  return (
    <Card className='mt-2'>
      <CardBody>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-5'>
          <Card>
            <CardHeader><CardTitle>Historial de Ejercicios</CardTitle></CardHeader>
            <CardBody style={{ border: `1px solid ${bordeColor}`}}>
                <TablaHistoricaEjercicio />
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preferencias de Entrenamiento</CardTitle></CardHeader>
            <CardBody className='rounded-md p-2' style={{ border: `1px solid ${bordeColor}`}}>
              <MuscleCanvas 
                imageUrl={imageUrl} 
                muscles={musclesData} 
                onMuscleClick={handleMuscleClick}
                onMuscleHover={handleMuscleHover}/>
                {/* {
                  miembro?.preferencias_entrenamiento && Object.keys(miembro.preferencias_entrenamiento).length > 0
                    ? (
                      <div className='grid grid-cols-2 gap-5 border-purple-500'>
                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='objetivo_entranamiento'>Objetivo Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='objetivo_entranamiento'>{miembro?.preferencias_entrenamiento.objetivo_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='tipo_entrenamiento'>Tipo Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='tipo_entrenamiento'>{miembro?.preferencias_entrenamiento.tipo_entrenamiento_preferido}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='frecuencia_entrenamiento'>Frecuencia Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='frecuencia_entrenamiento'>{miembro?.preferencias_entrenamiento.frecuencia_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='intensidad_entrenamiento'>Intensidad Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='intensidad_entrenamiento'>{miembro?.preferencias_entrenamiento.intensidad_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='duracion_entrenamiento'>Duración Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='duracion_entrenamiento'>{miembro?.preferencias_entrenamiento.duracion_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='horario_entrenamiento'>Horario Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='horario_entrenamiento'>{miembro?.preferencias_entrenamiento.horario_entrenamiento}</span>
                          </div>
                        </div>
                      </div>
                    )
                    : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <span className='text-3xl'>No tiene preferencias aún registradas</span>
                      </div>
                    )
                } */}
            </CardBody>
          </Card>
        </div>

        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-5 mt-10'>
         {/* <Card>
          <CardHeader><CardTitle>Tabla de Asistencia</CardTitle></CardHeader>
          <CardBody  style={{ border: `1px solid ${bordeColor}`}}>
            <TablaAsistencia />  
            hola
          </CardBody>
         </Card> */}

         {/* <Card>
          <CardHeader><CardTitle>Gráfico de Asistencias</CardTitle></CardHeader>
          <CardBody className='w-full h-full p-2' style={{ border: `1px solid ${bordeColor}`}}>
            <Chart
              series={chartSeries}
              options={chartOptions}
              type="pie"
              height={350}
            />
          </CardBody>
         </Card> */}

        </div>
      </CardBody>
    </Card>
  )
}

export default HistorialEjercicios