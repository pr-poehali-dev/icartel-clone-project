import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  { name: 'Двигатель', icon: 'Cog', count: 245 },
  { name: 'Подвеска', icon: 'Wrench', count: 189 },
  { name: 'Тормозная система', icon: 'Circle', count: 156 },
  { name: 'Электрика', icon: 'Zap', count: 312 },
  { name: 'Трансмиссия', icon: 'Settings', count: 178 },
  { name: 'Кузов', icon: 'Box', count: 234 },
  { name: 'Освещение', icon: 'Lightbulb', count: 198 },
  { name: 'Расходники', icon: 'Package', count: 421 },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Комплект поршневых колец',
    price: 4500,
    category: 'Двигатель',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/4ad128f4-a203-4c8c-94ae-5d6419bbaad8.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'Тормозные диски передние',
    price: 6800,
    category: 'Тормозная система',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/7dd9a6ad-5826-47a3-b47c-9474a215d2d3.jpg',
    inStock: true,
  },
  {
    id: 3,
    name: 'Стойки амортизаторов (пара)',
    price: 12500,
    category: 'Подвеска',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/aee6fc37-58f7-4802-88ef-b6d65eac3da5.jpg',
    inStock: true,
  },
  {
    id: 4,
    name: 'Свечи зажигания NGK (4 шт)',
    price: 1200,
    category: 'Электрика',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/4ad128f4-a203-4c8c-94ae-5d6419bbaad8.jpg',
    inStock: true,
  },
  {
    id: 5,
    name: 'Масляный фильтр Mann',
    price: 450,
    category: 'Расходники',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/4ad128f4-a203-4c8c-94ae-5d6419bbaad8.jpg',
    inStock: true,
  },
  {
    id: 6,
    name: 'Тормозные колодки Brembo',
    price: 3200,
    category: 'Тормозная система',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/7dd9a6ad-5826-47a3-b47c-9474a215d2d3.jpg',
    inStock: true,
  },
  {
    id: 7,
    name: 'Шаровая опора передняя',
    price: 2100,
    category: 'Подвеска',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/aee6fc37-58f7-4802-88ef-b6d65eac3da5.jpg',
    inStock: true,
  },
  {
    id: 8,
    name: 'Генератор 120А',
    price: 8900,
    category: 'Электрика',
    image: 'https://cdn.poehali.dev/projects/6033167f-7cbf-4a84-91fe-44a269cd66a4/files/4ad128f4-a203-4c8c-94ae-5d6419bbaad8.jpg',
    inStock: false,
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Car" size={24} className="text-background" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AutoParts Pro</h1>
                <p className="text-xs text-muted-foreground">Премиальные запчасти</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="default" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-primary font-bold mt-1">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="border-t border-border pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">
                              {totalPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                            <Icon name="ArrowRight" size={20} className="ml-2" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Более 2000 наименований
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Оригинальные запчасти
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                для вашего авто
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Гарантия качества, доставка по России, профессиональная консультация
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8">
                Подобрать запчасти
                <Icon name="Search" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Каталог
                <Icon name="BookOpen" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8">Категории запчастей</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group cursor-pointer hover:border-primary transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={category.icon} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} товаров</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">Популярные товары</h3>
              <p className="text-muted-foreground">Лучшие предложения этой недели</p>
            </div>
            <Button variant="outline">
              Все товары
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {!product.inStock && (
                    <Badge className="absolute top-4 right-4 bg-destructive">Нет в наличии</Badge>
                  )}
                  {product.inStock && (
                    <Badge className="absolute top-4 right-4 bg-primary">В наличии</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button
                      size="sm"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                      className="group-hover:scale-110 transition-transform"
                    >
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold mb-2">Быстрая доставка</h4>
              <p className="text-sm text-muted-foreground">
                Доставка по России от 1 дня
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold mb-2">Гарантия качества</h4>
              <p className="text-sm text-muted-foreground">
                Официальная гарантия на все товары
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold mb-2">Поддержка 24/7</h4>
              <p className="text-sm text-muted-foreground">
                Профессиональная консультация
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">О магазине</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Контакты</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Покупателям</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Доставка и оплата</li>
                <li>Гарантия и возврат</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Каталог</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Двигатель</li>
                <li>Подвеска</li>
                <li>Электрика</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (800) 555-35-35</li>
                <li>info@autoparts.pro</li>
                <li>Москва, ул. Примерная, 1</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
            © 2024 AutoParts Pro. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
