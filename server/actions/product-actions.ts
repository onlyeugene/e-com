"use server"

import { actionClient } from "@/lib/safe-action"
import { DeleteProductSchema, ProductSchema } from "@/types/product-schema"
import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"

export const addProduct = actionClient
  .schema(ProductSchema)
  .action(
    async ({ parsedInput: { price, name, image, revenue } }) => {

      if (!image.trim()) {
        return {error: "Image is required"}
      }
      await prisma.product.create({
        data: {
          name:name,
          image: image,
          revenue: revenue,
          price: price,
        }})
    revalidatePath("/", "layout")
    return {success: `${name} has been added`}
  })

  export const editProduct = actionClient
  .schema(ProductSchema)
  .action(
    async ({ parsedInput: { price, name, image, revenue, id } }) => {
      
      if (!image.trim()) {
        return {error: "Image is required"}
      }
      await prisma.product.update({
        where: {id:id},
        data: {
          name:name,
          image: image,
          revenue: revenue,
          price: price,
        }})
    revalidatePath("/", "layout")
    return {success: `${name} has been updated`}
  })

  export const deleteProduct = actionClient
  .schema(DeleteProductSchema)
  .action(
    async ({ parsedInput: { id} }) => {
      await prisma.product.delete({
        where: {id: id}
        })
    revalidatePath("/", "layout")
    return
  })