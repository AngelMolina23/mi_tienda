from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, CheckoutView

router = DefaultRouter()
router.register(r"orders", OrderViewSet, basename="orders")

urlpatterns = [
    path("checkout/", CheckoutView.as_view()),
]

urlpatterns += router.urls