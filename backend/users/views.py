from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from orders.models import Order, Booking

from .serializers import UserSerializer, RegisterSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class ClientDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        bookings = Booking.objects.filter(user=request.user)

        total_spent = sum(order.total for order in orders)

        data = {
            "username": request.user.username,
            "email": request.user.email,
            "role": request.user.role,
            "total_orders": orders.count(),
            "total_bookings": bookings.count(),
            "total_spent": total_spent,
        }

        return Response(data)