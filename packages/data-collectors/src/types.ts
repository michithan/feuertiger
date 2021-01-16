export interface DepartmentLocationData {
    name: string | undefined;
    federation: string | undefined;
    adress: {
        street: string | undefined;
        streetNumber: string | undefined;
        postalCode: string | undefined;
        city: string | undefined;
    };
    phone: string | undefined;
    email: string | undefined;
    homepage: string | undefined;
    cords: {
        lat: number;
        long: number;
    };
}
