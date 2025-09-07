export interface Car {
    id?: number;
    make: string;
    model: string;
    carYear: number;
    color: string;
    miles: number;
    milesAtLastService: number;
}

export async function fetchCars(): Promise<Car[]> {
    const res = await fetch("API");
    if (!res.ok) throw new Error("Failed to fetch cars");
    return res.json();
}

export async function createCar(car: Car): Promise<Car> {
    const res = await fetch("API", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
    });
    if (!res.ok) throw new Error("Failed to create car");
    return res.json();
}
