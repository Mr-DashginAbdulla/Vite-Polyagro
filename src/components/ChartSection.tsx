import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';

interface ChartSectionProps {
  period: 'daily' | 'weekly' | 'monthly';
  data: {
    daily: {
      temperature: number[];
      humidity: number[];
      co2: number[];
    };
    weekly: {
      temperature: number[];
      humidity: number[];
      co2: number[];
    };
    monthly: {
      temperature: number[];
      humidity: number[];
      co2: number[];
    };
  };
}

const ChartSection: React.FC<ChartSectionProps> = ({ period, data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (chartRef.current && !chart) {
      const newChart = echarts.init(chartRef.current);
      setChart(newChart);
    }

    const updateChart = () => {
      if (!chart) return;

      const chartData = data[period];
      const timeLabels = {
        daily: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        weekly: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
        monthly: ['1', '5', '10', '15', '20', '25', '30', '35', '40', '45']
      };

      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis' as const,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#eee',
          borderWidth: 1,
          textStyle: {
            color: '#1f2937',
            fontSize: 14
          },
          formatter: function(params: any) {
            let result = params[0].axisValue + '<br/>';
            params.forEach((param: any) => {
              const value = param.value;
              const unit = param.seriesName === t('components.chart.temperature') ? t('components.chart.temperatureUnit') : 
                          param.seriesName === t('components.chart.humidity') ? t('components.chart.humidityUnit') : 
                          t('components.chart.co2Unit');
              result += `${param.marker} ${param.seriesName}: ${value}${unit}<br/>`;
            });
            return result;
          }
        },
        legend: {
          data: [t('components.chart.temperature'), t('components.chart.humidity'), t('components.chart.co2')],
          bottom: 0,
          textStyle: {
            color: '#374151',
            fontSize: 14
          }
        },
        grid: {
          top: 30,
          right: 30,
          bottom: 60,
          left: 60
        },
        xAxis: {
          type: 'category' as const,
          data: timeLabels[period],
          axisLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          axisLabel: {
            color: '#374151',
            fontSize: 13,
            fontWeight: 500 as const
          }
        },
        yAxis: [{
          type: 'value' as const,
          name: `${t('components.chart.temperature')} (${t('components.chart.temperatureUnit')}) / ${t('components.chart.humidity')} (${t('components.chart.humidityUnit')})`,
          nameTextStyle: {
            color: '#374151',
            fontSize: 13,
            fontWeight: 500 as const
          },
          axisLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          axisLabel: {
            color: '#374151',
            fontSize: 13,
            fontWeight: 500 as const
          }
        },
        {
          type: 'value' as const,
          name: `${t('components.chart.co2')} (${t('components.chart.co2Unit')})`,
          nameTextStyle: {
            color: '#374151',
            fontSize: 13,
            fontWeight: 500 as const
          },
          axisLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#374151',
            fontSize: 13,
            fontWeight: 500 as const
          }
        }],
        series: [{
          name: t('components.chart.temperature'),
          type: 'line',
          smooth: true,
          data: chartData.temperature,
          lineStyle: {
            color: 'rgba(87, 181, 231, 1)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(87, 181, 231, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(87, 181, 231, 0.1)'
            }])
          },
          symbol: 'none'
        },
        {
          name: t('components.chart.humidity'),
          type: 'line',
          smooth: true,
          data: chartData.humidity,
          lineStyle: {
            color: 'rgba(141, 211, 199, 1)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(141, 211, 199, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(141, 211, 199, 0.1)'
            }])
          },
          symbol: 'none'
        },
        {
          name: t('components.chart.co2'),
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: chartData.co2,
          lineStyle: {
            color: 'rgba(251, 191, 114, 1)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(251, 191, 114, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(251, 191, 114, 0.1)'
            }])
          },
          symbol: 'none'
        }]
      };

      chart.setOption(option);
    };

    updateChart();

    const handleResize = () => {
      chart?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart?.dispose();
    };
  }, [chart, period, data, t]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div ref={chartRef} className="chart-container"></div>
    </div>
  );
};

export default ChartSection; 