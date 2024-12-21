import { z, ZodError } from "zod";
describe("Zod", () => {
    it("should be able to do validation", () => {
        const schema = z.string().min(3).max(10);
        const request = "Express";
        const result = schema.parse(request);
        console.log(result);
        expect(result).toBe("Express");
    });
    it("should be able to validate primitive data types", () => {
        const usernameSchema = z.string().email();
        const isAdminSchema = z.boolean();
        const priceScema = z.number().min(1000).max(1000000);
        const username = usernameSchema.parse("express@example.com");
        console.log(username);
        const admin = isAdminSchema.parse(true);
        console.log(admin);
        const price = priceScema.parse(75000);
        console.log(price);
    });
    it("should be able to validate and convert", () => {
        const usernameSchema = z.coerce.string();
        const isAdminSchema = z.coerce.boolean();
        const priceScema = z.coerce.number().min(1000).max(1000000);
        const username = usernameSchema.parse(100);
        console.log(`${typeof username}: ${username}`);
        const admin = isAdminSchema.parse("true");
        console.log(`${typeof admin}: ${admin}`);
        const price = priceScema.parse("75000");
        console.log(`${typeof price}: ${price}`);
    });
    it("should be able to validate date", () => {
        const birthDataSchema = z.coerce
            .date()
            .min(new Date(1990, 0, 1))
            .max(new Date(2020, 0, 1));
        const birtDate1 = birthDataSchema.parse("2019-01-01");
        console.log(birtDate1);
        const birtDate2 = birthDataSchema.parse(new Date(2000, 0, 1));
        console.log(birtDate2);
    });
    it("should return zod error if invalid", () => {
        const schema = z.string().email().min(3).max(10);
        try {
            schema.parse("Ex");
        }
        catch (error) {
            if (error instanceof ZodError) {
                // console.log(error.issues);
                error.errors.forEach((error) => void console.log(error.message));
            }
        }
    });
    it("should return zod error if invalid without thow exception", () => {
        const schema = z.string().email().min(3).max(100);
        const result = schema.safeParse("Ex");
        console.log(result);
        if (result.success) {
            console.log(result.data);
        }
        else {
            console.log(result.error.errors);
        }
    });
    it("should be able to validate object", () => {
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string().min(8).max(100),
        });
        const request = {
            email: "express@example.com",
            firstName: "Hello",
            password: "password123",
            lastName: "Express",
        };
        const result = loginSchema.parse(request);
        console.log(result);
    });
    it("should be able to validate nested object", () => {
        const userSchema = z.object({
            firstName: z.string().min(1).max(100),
            lastName: z.string().min(1).max(100),
            address: z.object({
                street: z.string().min(1).max(100),
                city: z.string().min(1).max(100),
                postalCode: z.string().min(1).max(20),
                country: z.string().min(1).max(100),
            }),
        });
        const request = {
            firstName: "Hello",
            lastName: "Express",
            address: {
                street: "Street Express",
                city: "City Express",
                postalCode: "01010101",
                country: "Country Express",
            },
        };
        const result = userSchema.parse(request);
        console.log(result);
    });
    it("should be able to validate array", () => {
        const schema = z.array(z.string()).min(2).max(10);
        const request = ["Hello", "Express"];
        const result = schema.parse(request);
        console.log(result);
    });
    it("should be able to validate set", () => {
        const schema = z.set(z.string()).min(2).max(10);
        const request = new Set(["Hello", "Express", "Hello"]);
        const result = schema.parse(request);
        console.log(result);
    });
    it("should be able to validate map", () => {
        const schema = z.map(z.string().min(1), z.string().email());
        const request = new Map([
            ["a", "express@example.com"],
            ["b", "next@example.com"],
        ]);
        const result = schema.parse(request);
        console.log(result);
    });
    it("should be able to do custom message", () => {
        const loginSchema = z.object({
            email: z.string().email("Username harus email"),
            password: z
                .string()
                .min(8, "Minimal karater untuk password adalah 8")
                .max(10, "Maksimal karater untuk password adalah 10"),
        });
        const request = {
            email: "express",
            password: "pass",
        };
        try {
            const result = loginSchema.parse(request);
            console.log(result);
        }
        catch (error) {
            console.log(error.errors);
        }
    });
    it("should be able to do optional validation", () => {
        const userSchema = z.object({
            email: z.string().email().max(100),
            first_name: z.string().min(3).max(100),
            last_name: z.string().min(3).max(100).optional(),
            password: z.string().min(8).max(100),
        });
        const request = {
            email: "Express@example.com",
            first_name: "Hello",
            password: "password123",
        };
        const result = userSchema.parse(request);
        console.log(result);
    });
    it("should be able to transform after parse success", () => {
        const usernameSchema = z
            .string()
            .min(1)
            .max(100)
            .transform((data) => data.toUpperCase());
        const result = usernameSchema.parse("Hello Express");
        console.log(result);
    });
    function mustBeUpperCase(data, ctx) {
        if (data !== data.toUpperCase()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Username harus uppercase",
            });
            return z.NEVER;
        }
        return data;
    }
    it("should be able to do custom validation", () => {
        const loginSchema = z.object({
            username: z.string().email().transform(mustBeUpperCase),
            password: z.string().min(8).max(100),
        });
        const request = {
            username: "EXPRESS@GMAIL.COM",
            password: "password123",
        };
        const result = loginSchema.parse(request);
        console.log(result);
    });
});
