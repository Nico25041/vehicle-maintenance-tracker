"use client";
import { useState, useEffect } from "react";
import { Car, Trash2, Search, SortAsc, Wrench, Plus } from "lucide-react";

export interface CarData {
  id?: number;
  make: string;
  model: string;
  color: string;
  carYear: number;
  miles: number;
  milesAtLastService: number;
}

export default function Home() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [form, setForm] = useState<CarData>({
    make: "",
    model: "",
    color: "",
    carYear: 2021,
    miles: 0,
    milesAtLastService: 0,
  });
  const [activeOperation, setActiveOperation] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [deleteForm, setDeleteForm] = useState<CarData>({
    make: "",
    model: "",
    color: "",
    carYear: 2021,
    miles: 0,
    milesAtLastService: 0,
  });

  const fetchCars = async (endpoint = "") => {
    setLoading(true);
    try {
      const url = endpoint ? `http://localhost:8080/cars${endpoint}` : "http://localhost:8080/cars";
      const res = await fetch(url);
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:8080/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      fetchCars();
      setForm({
        make: "",
        model: "",
        color: "",
        carYear: 2021,
        miles: 0,
        milesAtLastService: 0,
      });
    } catch (error) {
      console.error("Error creating car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:8080/cars", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteForm),
      });
      fetchCars();
      setDeleteForm({
        make: "",
        model: "",
        color: "",
        carYear: 2021,
        miles: 0,
        milesAtLastService: 0,
      });
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setLoading(false);
    }
  };

  const operations = [
    { id: "all", label: "All Cars", icon: Car, endpoint: "", color: "bg-blue-600 hover:bg-blue-700" },
    { id: "sorted-year", label: "Sort by Year", icon: SortAsc, endpoint: "/sorted-year", color: "bg-purple-600 hover:bg-purple-700" },
    { id: "sorted-miles", label: "Sort by Miles", icon: SortAsc, endpoint: "/sorted-miles", color: "bg-green-600 hover:bg-green-700" },
    { id: "sorted-make", label: "Sort by Make", icon: SortAsc, endpoint: "/sorted-make", color: "bg-indigo-600 hover:bg-indigo-700" },
    { id: "needs-service", label: "Needs Service", icon: Wrench, endpoint: "/needs-service", color: "bg-red-600 hover:bg-red-700" },
  ];

  const handleOperationClick = (operation: any) => {
    setActiveOperation(operation.id);
    fetchCars(operation.endpoint);
  };

  const getServiceStatus = (car: CarData) => {
    const milesSinceService = car.miles - car.milesAtLastService;
    if (milesSinceService > 3000) {
      return { status: "overdue", text: "Service Overdue", color: "text-red-700 bg-red-100" };
    } else if (milesSinceService > 2500) {
      return { status: "due", text: "Service Due Soon", color: "text-yellow-700 bg-yellow-100" };
    }
    return { status: "good", text: "Service OK", color: "text-green-700 bg-green-100" };
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3">
              <Car className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-800">
                Vehicle Maintenance Tracker
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Operations Panel */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Operations</h2>
            <div className="flex flex-wrap gap-3">
              {operations.map((operation) => {
                const Icon = operation.icon;
                return (
                    <button
                        key={operation.id}
                        onClick={() => handleOperationClick(operation)}
                        className={`${operation.color} ${
                            activeOperation === operation.id ? "ring-4 ring-blue-200" : ""
                        } text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                        disabled={loading}
                    >
                      <Icon className="w-5 h-5" />
                      {operation.label}
                    </button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add Car Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-slate-800">Add New Car</h2>
              </div>
              <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Make (e.g., Toyota, Honda)"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={form.make}
                    onChange={(e) => setForm({ ...form, make: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Model (e.g., Camry, Accord)"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Color"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={form.carYear}
                    onChange={(e) => setForm({ ...form, carYear: Number(e.target.value) })}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Current Odometer Reading
                  </label>
                  <input
                      type="number"
                      placeholder="e.g., 45,000 (total miles on the car)"
                      className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                      value={form.miles}
                      onChange={(e) => setForm({ ...form, miles: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Odometer Reading at Last Service
                  </label>
                  <input
                      type="number"
                      placeholder="e.g., 42,000 (miles when last serviced)"
                      className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                      value={form.milesAtLastService}
                      onChange={(e) =>
                          setForm({ ...form, milesAtLastService: Number(e.target.value) })
                      }
                  />
                </div>
                <button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreate}
                    disabled={loading}
                >
                  {loading ? "Adding..." : "Add Car"}
                </button>
              </div>
            </div>

            {/* Delete Car Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6">
                <Trash2 className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-slate-800">Delete Car</h2>
              </div>
              <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Make"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={deleteForm.make}
                    onChange={(e) => setDeleteForm({ ...deleteForm, make: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Model"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={deleteForm.model}
                    onChange={(e) => setDeleteForm({ ...deleteForm, model: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Color"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={deleteForm.color}
                    onChange={(e) => setDeleteForm({ ...deleteForm, color: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                    value={deleteForm.carYear}
                    onChange={(e) => setDeleteForm({ ...deleteForm, carYear: Number(e.target.value) })}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Current Odometer Reading
                  </label>
                  <input
                      type="number"
                      placeholder="e.g., 45,000 (total miles on the car)"
                      className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                      value={deleteForm.miles}
                      onChange={(e) => setDeleteForm({ ...deleteForm, miles: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Odometer Reading at Last Service
                  </label>
                  <input
                      type="number"
                      placeholder="e.g., 42,000 (miles when last serviced)"
                      className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder-slate-500"
                      value={deleteForm.milesAtLastService}
                      onChange={(e) =>
                          setDeleteForm({ ...deleteForm, milesAtLastService: Number(e.target.value) })
                      }
                  />
                </div>
                <button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDelete}
                    disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Car"}
                </button>
              </div>
            </div>
          </div>

          {/* Car List */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">
                {operations.find(op => op.id === activeOperation)?.label || "All Cars"} ({cars.length})
              </h2>
              {loading && (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              )}
            </div>

            {cars.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
                  <Car className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 text-lg">No cars found</p>
                </div>
            ) : (
                <div className="grid gap-6">
                  {cars.map((car, index) => {
                    const serviceStatus = getServiceStatus(car);
                    const milesSinceService = car.miles - car.milesAtLastService;

                    return (
                        <div
                            key={car.id || index}
                            className="bg-white shadow-xl rounded-2xl border border-slate-200 p-6 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">🚗</span>
                                <h3 className="text-xl font-bold text-slate-800">
                                  {car.make} {car.model} ({car.carYear})
                                </h3>
                              </div>
                              <div className="grid md:grid-cols-3 gap-2 text-slate-600">
                                <p><span className="font-medium">Color:</span> {car.color}</p>
                                <p><span className="font-medium">Miles:</span> {car.miles.toLocaleString()}</p>
                                <p><span className="font-medium">Last Service:</span> {car.milesAtLastService.toLocaleString()}</p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${serviceStatus.color}`}>
                          {serviceStatus.text}
                        </span>
                              <p className="text-sm text-slate-600">
                                {milesSinceService.toLocaleString()} miles since service
                              </p>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}