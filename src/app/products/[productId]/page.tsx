"use client"
import NoSidebarLayout from '@/app/components/layout/NoSidebarLayout'
import ProductDetail from '@/app/components/product/ProductDetail'
import { useParams } from 'next/navigation'
import React from 'react'

const ProductDetailPage = () => {
    const {productId} = useParams();
  return (
    <NoSidebarLayout>
        <ProductDetail productId={Number(productId)}/>
    </NoSidebarLayout>
  )
}

export default ProductDetailPage