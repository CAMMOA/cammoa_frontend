import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from '@components/shared/UIStyles';
import ProductImage from '@components/ProductDetail/ProductImage';
import ProductInfo from '@components/ProductDetail/ProductInfo';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://15.165.99.110:8080';

const ProductDetail = () => {
  const { post_id } = useParams();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    if (!post_id) return;
    setIsLoading(true);
    setHasError(false);

    const token = localStorage.getItem('accessToken');

    axios
      .get(`${API_URL}/api/posts/${post_id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
      .then((res) => {
        if (res.data.status === 'OK' && res.data.data) {
          setDetail(res.data.data);
          const images =
            Array.isArray(res.data.data.imageUrl) && res.data.data.imageUrl.length > 0
              ? res.data.data.imageUrl
              : [];
          setImgList(images);
          setIsLoading(false);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [post_id]);

  if (isLoading) return <div>로딩 중...</div>;
  if (hasError || !detail) return <div>게시글을 불러올 수 없습니다.</div>;

  return (
    <ProductDetailContainer>
      <DetailBody>
        <ProductImage images={imgList} title={detail?.title} />
        <ProductInfo detail={detail} />
      </DetailBody>
      <ProductExplainContainer>
        <ExplainHeader>작성자의 설명</ExplainHeader>
        <ExplainText>{detail.description}</ExplainText>
      </ProductExplainContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetail;

const ProductDetailContainer = styled(Container)`
  width: fit-content;
  padding: 55px 0 120px 0;
  gap: 75px;
`;
const DetailBody = styled(Container)`
  flex-direction: row;
  gap: 65px;
`;
const ProductExplainContainer = styled(Container)`
  width: 100%;
  align-items: flex-start;
  gap: 30px;
`;
const ExplainHeader = styled.p`
  width: 100%;
  padding-bottom: 21px;
  border-bottom: 1px solid #e6e6e6;
  color: #141313;
  ${({ theme }) => theme.fontStyles.Body4};
  font-weight: 500;
  line-height: 134%:
`;
const ExplainText = styled.p`
  width: 1050px;
  color: #333;
  ${({ theme }) => theme.fontStyles.Body7};
  font-size: 15px;
  line-height: 161%;
`;
