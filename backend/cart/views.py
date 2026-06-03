from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CartItem
from .serializers import CartItemSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity", 1))

        if quantity <= 0:
            return Response(
                {"detail": "La cantidad debe ser mayor a 0."},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item = CartItem.objects.filter(
            user=request.user,
            product_id=product_id
        ).first()

        if cart_item:
            cart_item.quantity += quantity
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)