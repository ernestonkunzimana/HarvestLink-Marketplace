'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { TrendingUp, TrendingDown, Brain, AlertCircle } from 'lucide-react';
import { mockPricePredictions } from '@/lib/mock-data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function PricePredictionPage() {
  const chartData = [
    { month: 'Jan', Maize: 420, Rice: 780, Coffee: 2400 },
    { month: 'Feb', Maize: 450, Rice: 800, Coffee: 2500 },
    { month: 'Mar', Maize: 520, Rice: 750, Coffee: 2800 },
    { month: 'Apr', Maize: 480, Rice: 720, Coffee: 2650 },
    { month: 'May', Maize: 510, Rice: 740, Coffee: 2900 },
    { month: 'Jun', Maize: 490, Rice: 760, Coffee: 2750 }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'bg-green-100 text-green-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPriceChangeIcon = (current: number, predicted: number) => {
    return predicted > current ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 mr-3 text-blue-600" />
            AI Price Prediction
          </h1>
          <p className="text-gray-600">Machine learning-powered price forecasting for agricultural commodities</p>
        </div>

        {/* Price Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>6-Month Price Trends & Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`RWF ${value}`, '']} />
                <Legend />
                <Line type="monotone" dataKey="Maize" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="Rice" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Coffee" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPricePredictions.map((prediction) => (
            <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{prediction.crop}</CardTitle>
                  {getPriceChangeIcon(prediction.currentPrice, prediction.predictedPrice)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Current Price</p>
                      <p className="text-xl font-bold">RWF {prediction.currentPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Predicted Price</p>
                      <p className="text-xl font-bold text-blue-600">RWF {prediction.predictedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Price Change</p>
                      <p className={`font-semibold ${prediction.predictedPrice > prediction.currentPrice ? 'text-green-600' : 'text-red-600'}`}>
                        {prediction.predictedPrice > prediction.currentPrice ? '+' : ''}
                        {((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice * 100).toFixed(1)}%
                      </p>
                    </div>
                    <Badge className={getConfidenceColor(prediction.confidence)}>
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Key Factors:</p>
                    <div className="space-y-1">
                      {prediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-700">
                          <AlertCircle className="h-3 w-3 mr-2 text-blue-500" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Model Performance */}
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <p className="text-sm text-gray-600">Data Points</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15</div>
                <p className="text-sm text-gray-600">Variables Analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Daily</div>
                <p className="text-sm text-gray-600">Update Frequency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}