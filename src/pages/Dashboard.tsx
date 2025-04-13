import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import ControlCard from '../components/ControlCard';
import { useDevices } from '../contexts/DeviceContext';

interface Greenhouse {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

interface ReportData {
  temperature: number[];
  humidity: number[];
  co2: number[];
  time: string[];
}

const Dashboard: React.FC = () => {
  const { devices, updateDeviceData } = useDevices();
  const [autoWatering, setAutoWatering] = useState(true);
  const [waterAmount, setWaterAmount] = useState(50);
  const [fanStatus, setFanStatus] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(30);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState<string>('1');
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showDropdown, setShowDropdown] = useState(false);

  const greenhouses: Greenhouse[] = devices.map(device => ({
    id: device.id,
    name: device.name,
    status: device.status
  }));

  const selectedDevice = devices.find(d => d.id === selectedGreenhouse);

  const mockData: ReportData = {
    temperature: Array.from({length: 24}, () => Math.random() * 5 + 22),
    humidity: Array.from({length: 24}, () => Math.random() * 10 + 60),
    co2: Array.from({length: 24}, () => Math.random() * 200 + 700),
    time: Array.from({length: 24}, (_, i) => `${i}:00`)
  };

  useEffect(() => {
    const lineChart = echarts.init(document.getElementById('lineChart') as HTMLElement);

    lineChart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: {
          color: '#1f2937'
        }
      },
      legend: {
        data: ['Sıcaklık', 'Nem', 'CO₂'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: mockData.time
      },
      yAxis: [
        {
          type: 'value',
          name: 'Sıcaklık/Nem',
          position: 'left'
        },
        {
          type: 'value',
          name: 'CO₂',
          position: 'right'
        }
      ],
      series: [
        {
          name: 'Sıcaklık',
          type: 'line',
          smooth: true,
          data: mockData.temperature,
          itemStyle: {
            color: 'rgba(87, 181, 231, 1)'
          },
          areaStyle: {
            opacity: 0.2,
            color: 'rgba(87, 181, 231, 1)'
          }
        },
        {
          name: 'Nem',
          type: 'line',
          smooth: true,
          data: mockData.humidity,
          itemStyle: {
            color: 'rgba(141, 211, 199, 1)'
          },
          areaStyle: {
            opacity: 0.2,
            color: 'rgba(141, 211, 199, 1)'
          }
        },
        {
          name: 'CO₂',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: mockData.co2,
          itemStyle: {
            color: 'rgba(251, 191, 114, 1)'
          },
          areaStyle: {
            opacity: 0.2,
            color: 'rgba(251, 191, 114, 1)'
          }
        }
      ]
    });

    const handleResize = () => {
      lineChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lineChart.dispose();
    };
  }, []);

  const handleWateringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoWatering(e.target.checked);
  };

  const handleWaterAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaterAmount(Number(e.target.value));
  };

  const handleFanStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFanStatus(e.target.checked);
  };

  const handleFanSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFanSpeed(Number(e.target.value));
  };

  const handleManualWatering = () => {
    // API çağrısı yapılacak
    console.log('Manuel sulama başlatıldı:', waterAmount);
  };

  const handleFanSettings = () => {
    // API çağrısı yapılacak
    console.log('Fan ayarları kaydedildi:', { status: fanStatus, speed: fanSpeed });
  };

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly') => {
    setChartPeriod(period);
    // Burada seçilen periyoda göre veri güncelleme işlemleri yapılabilir
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-green-200 flex items-center justify-center">
                <i className="ri-plant-line text-primary text-2xl"></i>
              </div>
              <div>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-base font-medium"
                  >
                    <span>{selectedDevice?.name || 'Cihaz Seçin'}</span>
                    <i className="ri-arrow-down-s-line text-lg"></i>
                  </button>
                  {showDropdown && (
                    <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full">
                      <div className="py-1">
                        {greenhouses.map((greenhouse) => (
                          <button
                            key={greenhouse.id}
                            onClick={() => {
                              setSelectedGreenhouse(greenhouse.id);
                              setShowDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {greenhouse.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1.5">Son güncelleme: {selectedDevice?.lastSeen || 'Veri yok'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all active:scale-95">
                <i className="ri-refresh-line text-lg"></i>
                <span className="font-medium">Yenile</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Toprak Nemi"
            value={`${selectedDevice?.data?.soilMoisture || 0}%`}
            icon="ri-water-flash-line"
            iconColor="text-blue-500"
            description="Optimal seviyede"
            progress={{
              value: selectedDevice?.data?.soilMoisture || 0,
              color: '#3b82f6'
            }}
          />
          <StatCard
            title="Sıcaklık"
            value={`${selectedDevice?.data?.temperature || 0}°C`}
            icon="ri-temp-hot-line"
            iconColor="text-orange-500"
            minMax={{
              min: "18°C",
              max: "28°C"
            }}
          />
          <StatCard
            title="CO2 Seviyesi"
            value={`${selectedDevice?.data?.co2 || 0} PPM`}
            icon="ri-cloud-line"
            iconColor="text-purple-500"
            description="Normal seviyede"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => handlePeriodChange('daily')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  chartPeriod === 'daily' ? 'bg-green-100 text-green-600 shadow-sm' : ''
                }`}
              >
                Günlük
              </button>
              <button
                onClick={() => handlePeriodChange('weekly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  chartPeriod === 'weekly' ? 'bg-green-100 text-green-600 shadow-sm' : ''
                }`}
              >
                Haftalık
              </button>
              <button
                onClick={() => handlePeriodChange('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  chartPeriod === 'monthly' ? 'bg-green-100 text-green-600 shadow-sm' : ''
                }`}
              >
                Aylık
              </button>
            </div>
          </div>
          <div className="chart-container" id="lineChart"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ControlCard
            title="Sulama Kontrolü"
            isEnabled={autoWatering}
            onToggle={handleWateringChange}
            value={waterAmount}
            onValueChange={handleWaterAmountChange}
            valueLabel="Su Miktarı"
            valueUnit="%"
            buttonText="Manuel Sulama Başlat"
            onButtonClick={handleManualWatering}
            buttonDisabled={autoWatering}
          />
          <ControlCard
            title="Fan Kontrolü"
            isEnabled={fanStatus}
            onToggle={handleFanStatusChange}
            value={fanSpeed}
            onValueChange={handleFanSpeedChange}
            valueLabel="Fan Hızı"
            valueUnit="%"
            buttonText="Fan Ayarlarını Kaydet"
            onButtonClick={handleFanSettings}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 