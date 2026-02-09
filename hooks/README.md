# Custom Hooks

Thư mục này chứa tất cả các custom hooks của project, được tổ chức theo chức năng.

## Cấu trúc

```
hooks/
├── queries/          # TanStack Query hooks (GET requests)
│   ├── useHomePage.ts
│   └── index.ts      # Export tất cả query hooks
├── mutations/         # TanStack Mutation hooks (POST, PUT, PATCH, DELETE)
│   └── index.ts      # Export tất cả mutation hooks
└── index.ts          # Main export file
```

## Cách sử dụng

### Import Query Hooks

```typescript
// Cách 1: Import từ queries
import { useHomePage } from '@/hooks/queries';

// Cách 2: Import từ hooks (re-export)
import { useHomePage } from '@/hooks';
```

### Import Mutation Hooks

```typescript
// Cách 1: Import từ mutations
import { useCreateUserMutation } from '@/hooks/mutations';

// Cách 2: Import từ hooks (re-export)
import { useCreateUserMutation } from '@/hooks';
```

## Tạo Hook Mới

### Query Hook

1. Tạo file trong `hooks/queries/`: `use[EntityName].ts`
2. Sử dụng template từ Cursor skill `create-query-hook`
3. Export hook và types
4. Thêm export vào `hooks/queries/index.ts`

### Mutation Hook

1. Tạo file trong `hooks/mutations/`: `use[EntityName]Mutation.ts`
2. Sử dụng template từ Cursor skill `create-mutation-hook`
3. Export hook và types
4. Thêm export vào `hooks/mutations/index.ts`

## Quy tắc

- Query hooks: Đặt trong `hooks/queries/`
- Mutation hooks: Đặt trong `hooks/mutations/`
- Luôn export types cùng với hooks
- Sử dụng `axiosInstance` từ `@/lib/axios`
- Tuân theo templates trong Cursor skills

## Ví dụ

Xem `hooks/queries/useHomePage.ts` để tham khảo implementation thực tế.
