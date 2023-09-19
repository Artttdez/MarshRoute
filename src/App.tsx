import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import { Button, Layout, Menu, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SchoolIcon from '@mui/icons-material/School';
import MuseumIcon from '@mui/icons-material/Museum';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import './App.css';
import Title from 'antd/es/typography/Title';

function App() {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ROUTES: { [key: string]: number[][] } = {
    itmo: [[59.956435, 30.308726], [59.961102, 30.306651], [59.965935, 30.305007], [59.972370, 30.301980]],
    petrogabar: [[59.967142, 30.300273], [59.966669, 30.303606], [59.963368, 30.306939]],
    petroga: [[59.950857, 30.322031], [59.955201, 30.323926], [59.957305, 30.322300], [59.960093, 30.318662], [59.962260, 30.313317], [59.963115, 30.315365], [59.964223, 30.309966], [59.962719, 30.298405], [59.966444, 30.311421]],
    sevkabel: [[59.924957, 30.239763], [59.924934, 30.240715], [59.924172, 30.240778], [59.923419, 30.245817], [59.922134, 30.250040]],
    vaskabar: [[59.935872, 30.273890], [59.940704, 30.277555], [59.945581, 30.278561]],
    vaskaprospects: [[59.938784, 30.260155], [59.941177, 30.267835], [59.943841, 30.264691], [59.944562, 30.273944], [59.938207, 30.283825]],
    rubinshteina: [[59.932459, 30.345629], [59.932135, 30.346177], [59.931497, 30.344754], [59.931228, 30.345557], [59.930449, 30.344452], [59.929357, 30.344515], [59.927694, 30.343527]],
    nevsky: [[59.937738, 30.309158], [59.935800, 30.325875], [59.934186, 30.332640], [59.934227, 30.338137], [59.933388, 30.344911], [59.930203, 30.362809]],
    griboedova: [[59.922499, 30.300103], [59.927004, 30.300785], [59.926720, 30.308475], [59.926449, 30.310415], [59.926526, 30.313847]],
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MENU = [
    {
      key: `petrogradsky`,
        label: `Петроградский`,
        children: [
          {
            key: 'itmo',
            label: `Кронва - Вязьма`,
            description: 'Будничный маршрут студентов ИТМО от здания на Кронверском до общежития. Пройдем знаменитыми дворами-колодцами и узкими параллельными улочками Петроградки.',
            image: 'https://almamater13.ru/800/600/http/img-fotki.yandex.ru/get/6515/157299282.a8/0_159444_3787ed84_XXL.jpg',
            icon: <SchoolIcon/>,
          },
          {
            key: 'petrogabar',
            label: `Петрога барная`,
            description: 'Get this party started! Проходка по пабам на Петроградской, заглянем в "Арденны", "Блуждающий форвард" и "Бармалей".',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/1899873/pub_61eea880f089ed434331ae7d_61eead4f827f142df75e5586/scale_1200',
            icon: <LocalBarIcon/>,
          },
          {
            key: 'petroga',
            label: `Петроградская`,
            description: 'Большая прогулка по Петроградской стороне от Петропавловской крепости до метро "Петроградская". Насыщенная программа - музеи, парки, рестораны.',
            image: 'https://glavguide.com/storage/service/kamennostrovskiy-prospekt22.jpg',
            icon: <MuseumIcon/>,
          },
        ]
    },
    {
      key: `vasilyevsky`,
        label: `Васильевский`,
        children: [
          {
            key: 'sevkabel',
            label: `Cевкабель и окрестности`,
            description: 'Прогулка по набережной у Севкабель Порта с посещением местных заведений.',
            image: 'https://map.autogoda.ru/wp-content/uploads/2023/05/1-12-2.jpg',
            icon: <LocalBarIcon/>,
          },
          {
            key: 'vaskabar',
            label: `Васька барная`,
            description: 'Маршрут для веселого вечера в компании по барам и пабам Васильевского острова.',
            image: 'https://photocentra.ru/images/main94/945761_main.jpg',
            icon: <LocalBarIcon/>,
          },
          {
            key: 'vaskaprospects',
            label: `Проспекты В.О.`,
            description: 'Прогулка по трем главным проспектам В.О. с остановками и знаковых зданий.',
            image: 'https://cs11.pikabu.ru/post_img/2020/04/29/7/og_og_1588155924221475774.jpg',
            icon: <PhotoCameraIcon/>,
          },
        ]
    },
    {
      key: `center`,
        label: `Центр`,
        children: [
          {
            key: 'rubinshteina',
            label: `Золотая миля по Рубинштейна`,
            description: 'Повторяем сюжет фильма "Армагеддец" на главной питейной улице Питера! Череда из разнообразных баров за одну ночь - достойный вызов!',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/3892121/pub_5f6dbee8730d4120c29391f9_5f6dbef73aa39e43aacf4d2f/scale_1200',
            icon: <LocalBarIcon/>,
          },
          {
            key: 'nevsky',
            label: `По Невскому`,
            description: 'Главные достопримечательности некогда главной улицы Российской Империи в одной прогулке.',
            image: 'https://sportishka.com/uploads/posts/2022-04/1650701947_7-sportishka-com-p-nevskii-prospekt-sankt-peterburg-krasivo-f-7.jpg',
            icon: <LocalBarIcon/>,
          },
          {
            key: 'griboedova',
            label: `Канал Грибоедова`,
            description: 'Прогулка вдоль берегов канала Грибоедова: знаковые здания и мосты в самом сердце Петербурга.',
            image: 'https://i.pinimg.com/originals/e1/1d/52/e11d52ed809cd5bcfbb5bc35191c3b79.jpg',
            icon: <PhotoCameraIcon/>,
          },
        ]
    }
  ];

  const map = useRef<ymaps.Map | undefined>(undefined);
  const mapState = {
    center: [59.949002, 30.327143],
    zoom: 12
  };

  

  const items1: MenuProps['items'] = [{ key: 1, label: "Выбор маршрута"}, { key: 2, label: "Маршруты"}, { key: 3, label: "События"}]
  

  const [points, setPoints] = useState<(number[] | string)[]>();
  const [api, setApi] = useState<YMapsApi>();
  const [routeId, setRouteId] = useState<string | undefined>();

  const chosenRoute = useMemo(() => {
    return MENU.reduce((result, item) => {
      result.push(...item.children);
      return result;
    }, [] as any).find((child: any) => child.key === routeId);
  }, [MENU, routeId]);

  const addRoute = useCallback((ymaps: YMapsApi) => {
    setApi(ymaps);
  }, []);

  useEffect(() => {
    if (map?.current && points && api) {
      const multiRoute = new api.multiRouter.MultiRoute(
        {
          referencePoints: points,
          params: {
            routingMode: "pedestrian"
          }
        },
        {
          boundsAutoApply: true,
        }
      );
      map.current.geoObjects.removeAll();
      map.current.geoObjects.add(multiRoute as any);
    }
  }, [map, points, api]);

  const onSelectRoute = useCallback((route: { key: string }) => {
    setPoints(ROUTES[route.key]);
    setRouteId(route.key);
  }, [ROUTES]);

  return (
    <div className="App">
      <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
      </Header>
      <Content
        className='RouteContent'
      >
        <Layout
          style={{
            padding: '24px 0',
          }}
        >
          <Sider
          style={{
            width: 'auto',
            maxWidth: 'auto',
            minWidth: '400px',
          }}
          breakpoint="lg"
          collapsedWidth="0"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={MENU}
              onSelect={onSelectRoute}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              width: "100%",
            }}
            className="Map"
          >
            <YMaps query={{ apikey: '1d2d4e37-8ff6-4940-8ee3-6ba095c9e686', lang: 'ru_RU' }} >
              <Map
                modules={["multiRouter.MultiRoute"]}
                state={mapState}
                instanceRef={map}
                onLoad={addRoute}
                width={"100%"}
                height={800}
              >
              </Map>
            </YMaps>
            {
              routeId && 
            (
            <div className="RouteInfo" style={{ backgroundImage: `url(${chosenRoute.image})`}}>
              <div className="RouteInfo-Gradient">
              <Title level={2}>{chosenRoute.label}</Title>
              <div className="RouteInfo-Description">{chosenRoute.description}</div>
              {
                routeId === 'petroga' && (
                  <a href="/petroga.pdf" target="_blank">
                    <Button>Cкачать PDF</Button>
                  </a>
                )
              }
              </div>
            </div>
            )
            }
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        MarshRoute ©2023 Created by ITMO University
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
