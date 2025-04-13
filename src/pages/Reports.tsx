import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import Sidebar from '../components/Sidebar';
import { useDevices } from '../contexts/DeviceContext';
import Button from '../components/Button';
import StatCard from '../components/StatCard';

interface ReportData {
  temperature: number[];
  humidity: number[];
  co2: number[];
  time: string[];
}

const Reports: React.FC = () => {
  const { devices } = useDevices();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>('1');

  const selectedDeviceData = devices.find(d => d.id === selectedDevice);

  const mockData: ReportData = {
    temperature: Array.from({length: 24}, () => Math.random() * 5 + 22),
    humidity: Array.from({length: 24}, () => Math.random() * 10 + 60),
    co2: Array.from({length: 24}, () => Math.random() * 200 + 700),
    time: Array.from({length: 24}, (_, i) => `${i}:00`)
  };

  useEffect(() => {
    const lineChart = echarts.init(document.getElementById('lineChart') as HTMLElement);
    const pieChart = echarts.init(document.getElementById('pieChart') as HTMLElement);
    const barChart = echarts.init(document.getElementById('barChart') as HTMLElement);

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

    pieChart.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: {
          color: '#1f2937'
        }
      },
      legend: {
        bottom: 0
      },
      series: [
        {
          name: 'Kullanım',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 35, name: 'Sulama', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
            { value: 65, name: 'Fan', itemStyle: { color: 'rgba(141, 211, 199, 1)' } }
          ]
        }
      ]
    });

    barChart.setOption({
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
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Sıcaklık',
          type: 'bar',
          data: [23, 24, 25, 23, 24, 25, 26],
          itemStyle: {
            color: 'rgba(87, 181, 231, 1)'
          }
        },
        {
          name: 'Nem',
          type: 'bar',
          data: [65, 63, 64, 65, 66, 62, 63],
          itemStyle: {
            color: 'rgba(141, 211, 199, 1)'
          }
        }
      ]
    });

    const handleResize = () => {
      lineChart.resize();
      pieChart.resize();
      barChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lineChart.dispose();
      pieChart.dispose();
      barChart.dispose();
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="size-12 rounded-full bg-green-200 flex items-center justify-center">
                <i className="ri-plant-line text-primary text-2xl"></i>
              </div>
              <div className="flex-1 md:flex-none">
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full md:w-auto flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-base font-medium"
                  >
                    <span className="truncate">{selectedDeviceData?.name || 'Cihaz Seçin'}</span>
                    <i className="ri-arrow-down-s-line text-lg"></i>
                  </button>
                  {showDropdown && (
                    <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full">
                      <div className="py-1">
                        {devices.map((device) => (
                          <button
                            key={device.id}
                            onClick={() => {
                              setSelectedDevice(device.id);
                              setShowDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {device.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1.5">Son güncelleme: {selectedDeviceData?.lastSeen || 'Veri yok'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <StatCard
            title="Sıcaklık"
            value={`${selectedDeviceData?.data?.temperature || 0}°C`}
            icon="ri-temp-hot-line"
            iconColor="bg-blue-100"
            change={{
              value: '+2.5°C',
              type: 'increase'
            }}
            subtitle="Son 24 saat"
          />
          <StatCard
            title="Nem"
            value={`${selectedDeviceData?.data?.humidity || 0}%`}
            icon="ri-water-flash-line"
            iconColor="bg-green-100"
            change={{
              value: '-3.2%',
              type: 'decrease'
            }}
            subtitle="Son 24 saat"
          />
          <StatCard
            title="CO₂"
            value={`${selectedDeviceData?.data?.co2 || 0} PPM`}
            icon="ri-cloud-line"
            iconColor="bg-purple-100"
            change={{
              value: '+15 PPM',
              type: 'increase'
            }}
            subtitle="Son 24 saat"
          />
          <StatCard
            title="Sera Durumu"
            value={selectedDeviceData?.status === 'active' ? 'Aktif' : 'Pasif'}
            icon="ri-plant-line"
            iconColor="bg-orange-100"
            subtitle="Sistem Durumu"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center mb-6">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setTimeRange('daily')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  timeRange === 'daily' ? 'bg-green-100 text-green-600 shadow-sm' : ''
                }`}
              >
                Günlük
              </button>
              <button
                onClick={() => setTimeRange('weekly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  timeRange === 'weekly' ? 'bg-green-100 text-green-600 shadow-sm' : ''
                }`}
              >
                Haftalık
              </button>
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  timeRange === 'monthly' ? 'bg-green-100 text-green-600 shadow-sm' : ''
                }`}
              >
                Aylık
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
              />
              <span className="text-gray-500">-</span>
              <input
                type="date"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
              />
            </div>
            <Button>Uygula</Button>
          </div>
          <div className="chart-container" id="lineChart"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kullanım Dağılımı</h3>
            <div className="h-64" id="pieChart"></div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık Karşılaştırma</h3>
            <div className="h-64" id="barChart"></div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Detaylı Veriler</h3>
              <div className="flex items-center gap-2">
                <Button variant="icon">
                  <i className="ri-file-excel-line text-xl"></i>
                </Button>
                <Button variant="icon">
                  <i className="ri-file-pdf-line text-xl"></i>
                </Button>
                <Button variant="icon">
                  <i className="ri-mail-line text-xl"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports; 