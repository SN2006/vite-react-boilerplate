# Task Management System - Frontend

## Overview

This is a React-based frontend application for a Task Management System built with modern web technologies. The application provides a comprehensive task management interface with user authentication, state management, and task type customization.

### Key Features

- **User Authentication**: Secure login system with JWT token-based authentication
- **Task Management**: Create, read, update, and delete tasks with detailed properties (title, description, priority, due date)
- **State Management**: Custom states for task workflow customization
- **Task Types**: Categorize tasks by custom types
- **Dashboard**: Interactive dashboard displaying tasks with filtering and sorting capabilities
- **Responsive UI**: Modern, responsive interface built with TailwindCSS
- **Internationalization**: Multi-language support (English, Spanish) using i18next
- **Data Visualization**: Charts for task analytics using Nivo

## Technology Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **TanStack Query** - Server state management
- **TanStack Router** - Type-safe routing
- **TanStack Table** - Powerful table component
- **Axios** - HTTP client
- **Zustand** - Client state management with persistence
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TailwindCSS** - Utility-first CSS framework
- **i18next** - Internationalization
- **Nivo** - Data visualization
- **Vitest & Playwright** - Testing

## Key Code Examples

### 1. Axios Configuration

The application uses a centralized Axios instance with request/response interceptors for authentication:

```typescript
// src/lib/axious.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to dynamically add token from Zustand store
apiClient.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export default apiClient;
```

### 2. TanStack Query Hooks

Custom hooks for data fetching and mutations using TanStack Query:

```typescript
// src/features/tasks/api.ts
import { GetMyTaskResponse, Task, TaskRequest } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const getMyTasks = async () : Promise<Task[]> => {
    const response = await apiClient.get<GetMyTaskResponse>("/tasks/my");
    console.log(response.data.data);
    return response.data.data;
}

const createTask = async (task: TaskRequest) => {
    await apiClient.post(`/tasks`, task);
}

const updateTask = async ({id, task}: {id: number, task: TaskRequest}) => {
    await apiClient.patch(`/tasks/${id}`, task);
}

const deleteTask = async (id: number) => {
    await apiClient.delete(`/tasks/${id}`);
}

// Custom hooks
// Fetch user`s tasks
export const useMyTasks = () => useQuery<Task[]>({
    queryKey: ["my-tasks"],
    queryFn: getMyTasks,
});

// Create a new task
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate({ to: "/dashboard" });
        }
    });
}

// Update an existing task
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate({ to: "/dashboard" });
        }
    });
}

// Delete a task
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate({ to: "/dashboard" });
        }
    });
}
```

### 3. Zod Schema Validation

Form validation using Zod schemas with React Hook Form:

```typescript
// src/components/tasks/TaskModal.tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define validation schema
const taskSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	description: z.string().min(1, "Description is required").max(500, "Description is too long"),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
	stateId: z.number(),
	taskTypeId: z.number(),
	dueDate: z.string().min(1, "Due date is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;

// Use in component with React Hook Form
const {
	register,
	handleSubmit,
	formState: { errors },
	reset,
} = useForm<TaskFormData>({
	resolver: zodResolver(taskSchema),
	defaultValues: {
		priority: "MEDIUM",
	},
});
```

### 4. Zustand Store with Persistence

Authentication state management using Zustand with localStorage persistence:

```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	token: string | null;
	setToken: (token: string) => void;
	clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token: string) => set({ token }),
			clearToken: () => set({ token: null }),
		}),
		{
			name: 'auth-storage', // localStorage key
		}
	)
);
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

```bash
# Install dependencies
pnpm install

# Set up Git hooks and Playwright
pnpm setup
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Lab Report

For detailed information about the laboratory work, implementation details, and technical specifications, please refer to:

📄 **[Lab Report](./reports/workshop8/WORKSHOP_8.md)**
