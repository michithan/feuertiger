# Migration `20201012153305-e1a221a`

This migration has been generated by michael.thanei at 10/12/2020, 3:33:05 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201012152937-e1a221a..20201012153305-e1a221a
--- datamodel.dml
+++ datamodel.dml
@@ -1,13 +1,13 @@
 datasource postgresql {
-  url = "***"
-  provider        = "postgresql"
-  previewFeatures = ["transactionApi"]
+  url = "***"
+  provider = "postgresql"
 }
 generator client {
-  provider = "prisma-client-js"
-  output   = "../dist"
+  provider        = "prisma-client-js"
+  previewFeatures = ["transactionApi"]
+  output          = "../dist"
 }
 model Exercise {
   id           String   @id
```

