import {Dispatch, useState} from 'react';
import {ColorPicker, Input, NumericTextBox, Rating, Switch, TextArea} from '@progress/kendo-react-inputs';
import {AutoComplete, ComboBox, DropDownList, MultiSelect} from '@progress/kendo-react-dropdowns';
import {Button, ChipList} from '@progress/kendo-react-buttons';
import {Upload} from '@progress/kendo-react-upload';
import {Stepper, TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import {Form, FormElement} from '@progress/kendo-react-form';
import {Notification, NotificationGroup} from '@progress/kendo-react-notification';
import {Label} from '@progress/kendo-react-labels';
import {OfferType} from '../types/OfferType';
import {AppState} from '../types/AppState.ts';
import {Offer} from '../types/Offer.ts';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {api} from '../services/api.ts';
import {CITIES} from '../mocks/cities.ts';
import {KendoComboBoxOption} from '../types/KendoComboBoxOption.ts';
import {Image} from '../types/Image.ts';

interface CityOption {
  name: string;
  value: string;
}

interface OfferTypeOption {
  text: string;
  value: OfferType;
}

interface ChipDataItem {
  text: string;
  value: string;
}

interface FormDataType {
  title: string;
  price: number;
  type: OfferTypeOption;
  city: CityOption;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  children: number;
  hasPets: boolean;
  isPremium: boolean;
  isFavorite: boolean;
  description: string;
  amenities: string[];
  tags: ChipDataItem[];
  themeColor: string;
  keywords: string;
  images: Image[];
  previewImage?: Image;
}

interface OfferEditPageProps {
  setCurrentOffer: (id: number) => void;
  currentOffer: Offer;
  isAuthorized: boolean;
}

export const OfferEditPageComponent = (props: OfferEditPageProps) => {
  const {setCurrentOffer, currentOffer, isAuthorized} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [stepValue, setStepValue] = useState(0);
  const [openNotification, setOpenNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const offerTypes: OfferTypeOption[] = [
    {text: 'Apartment', value: 'apartment' as OfferType},
    {text: 'Room', value: 'room' as OfferType},
    {text: 'House', value: 'house' as OfferType},
    {text: 'Hotel', value: 'hotel' as OfferType},
  ];

  const cities: KendoComboBoxOption[] = CITIES.map((c) => ({name: c.title, value: c.title }));

  const amenitiesList = [
    'Wi-Fi',
    'Washing machine',
    'Towels',
    'Heating',
    'Coffee machine',
    'Baby seat',
    'Kitchen',
    'Dishwasher',
    'Cabel TV',
    'Fridge',
  ];

  const chipData: ChipDataItem[] = [
    {text: 'Featured', value: 'featured'},
    {text: 'New', value: 'new'},
    {text: 'Popular', value: 'popular'},
    {text: 'Eco-friendly', value: 'eco'},
  ];

  const stepperSteps = [
    {label: 'Basic Info', icon: 'k-i-home'},
    {label: 'Details', icon: 'k-i-info'},
    {label: 'Amenities', icon: 'k-i-check'},
    {label: 'Media', icon: 'k-i-image'},
  ];

  const [formData, setFormData] = useState<FormDataType>({
    ...currentOffer,
    // price: 120,
    type: offerTypes[0],
    // city: cities[0],
    city: cities.find((city) => city.name === currentOffer.city?.title)!,
    // rating: 4.5,
    // bedrooms: 2,
    // maxAdults: 4,
    // children: 2,
    // hasPets: true,
    // isPremium: false,
    // isFavorite: false,
    // description: 'A wonderful serenity has taken possession of my entire soul...',
    amenities: currentOffer.amenities.map((amenity) => amenity.name),
    tags: [],
    themeColor: '#ff6b6b',
    keywords: '',
  });

  const handleSubmit = () => {
    setIsLoading(true);

    // Symulacja wysyłania danych
    api.post('/offer/add', undefined, formData)
      .then(() => {
        setSuccessMessage('Oferta została pomyślnie utworzona!');
        setOpenNotification(true);
        setIsLoading(false);
        // Reset formularza
        setFormData({
          title: '',
          description: '',
          city: cities.find((c) => c.name === 'Warsaw')!,
          price: 0,
          type: offerTypes.find((type) => type.value === 'apartment')!,
          bedrooms: 1,
          maxAdults: 2,
          hasPets: false,
          isPremium: false,
          rating: 5,
          amenities: [],
          previewImage: undefined,
          images: [],
          isFavorite: false,
          children: 0,
          tags: [],
          themeColor: '#ff6b6b',
          keywords: '',
        });

      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div style={{padding: '40px', maxWidth: '1200px', margin: '0 auto'}}>
      <h1>Edit Offer - KendoReact Components Showcase</h1>

      <NotificationGroup
        style={{
          right: 0,
          bottom: 0,
          alignItems: 'flex-start',
          flexWrap: 'wrap-reverse',
        }}
      >
        {openNotification && (
          <Notification
            type={{style: 'success', icon: true}}
            closable
            onClose={() => setOpenNotification(false)}
          >
            <span>{successMessage}</span>
          </Notification>
        )}
      </NotificationGroup>

      <Form
        onSubmit={handleSubmit}
        initialValues={formData}
        render={(formRenderProps) => (
          <FormElement style={{width: '100%'}}>
            {/* Stepper */}
            <div style={{marginBottom: '30px'}}>
              <Stepper
                value={stepValue}
                onChange={(e) => setStepValue(e.value)}
                items={stepperSteps}
              />
            </div>

            {/* TabStrip */}
            <TabStrip selected={selectedTab} onSelect={(e) => setSelectedTab(e.selected)}>
              <TabStripTab title="Basic Information">
                <div style={{padding: '20px'}}>
                  {/* Input */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Title</Label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.value || ''})}
                      style={{width: '100%'}}
                      placeholder="Enter offer title"
                    />
                  </div>

                  {/* NumericTextBox */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Price per Night ($)</Label>
                    <NumericTextBox
                      name="price"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.value as number || 0})}
                      min={0}
                      max={10000}
                      format="c2"
                      style={{width: '100%'}}
                    />
                  </div>

                  {/* DropDownList */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Offer Type</Label>
                    <DropDownList
                      name="type"
                      data={offerTypes}
                      textField="text"
                      dataItemKey="value"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.value as OfferTypeOption})}
                      style={{width: '100%'}}
                    />
                  </div>

                  {/* ComboBox */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>City</Label>
                    <ComboBox
                      name="city"
                      data={cities}
                      textField="name"
                      dataItemKey="value"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.value as CityOption})}
                      style={{width: '100%'}}
                      placeholder="Select or type a city"
                    />
                  </div>

                  {/* Rating */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Rating</Label>
                    <div>
                      <Rating
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: e.value})}
                        max={5}
                        precision="half"
                      />
                      <span style={{marginLeft: '10px'}}>{formData.rating} / 5</span>
                    </div>
                  </div>

                  {/* Switch */}
                  <div style={{marginBottom: '20px', display: 'flex', gap: '30px'}}>
                    <div>
                      <Label>Premium Offer</Label>
                      <Switch
                        checked={formData.isPremium}
                        onChange={(e) => setFormData({...formData, isPremium: e.value})}
                      />
                    </div>
                    <div>
                      <Label>Allow Pets</Label>
                      <Switch
                        checked={formData.hasPets}
                        onChange={(e) => setFormData({...formData, hasPets: e.value})}
                      />
                    </div>
                    <div>
                      <Label>Favorite</Label>
                      <Switch
                        checked={formData.isFavorite}
                        onChange={(e) => setFormData({...formData, isFavorite: e.value})}
                      />
                    </div>
                  </div>
                </div>
              </TabStripTab>

              <TabStripTab title="Details & Capacity">
                <div style={{padding: '20px'}}>

                  {/* NumericTextBox - Bedrooms */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Number of Bedrooms</Label>
                    <NumericTextBox
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.value as number || 1})}
                      min={1}
                      max={10}
                      format="n0"
                      style={{width: '100%'}}
                    />
                  </div>

                  {/* NumericTextBox - Adults */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Maximum Adults</Label>
                    <NumericTextBox
                      value={formData.maxAdults}
                      onChange={(e) => setFormData({...formData, maxAdults: e.value as number || 1})}
                      min={1}
                      max={20}
                      format="n0"
                      style={{width: '100%'}}
                    />
                  </div>

                  {/* NumericTextBox - Children */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Maximum Children</Label>
                    <NumericTextBox
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: e.value as number || 0})}
                      min={0}
                      max={10}
                      format="n0"
                      style={{width: '100%'}}
                    />
                  </div>

                  {/* TextArea */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Description</Label>
                    <TextArea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.value || ''})}
                      rows={5}
                      style={{width: '100%'}}
                      placeholder="Describe your offer..."
                    />
                  </div>
                </div>
              </TabStripTab>

              <TabStripTab title="Amenities & Tags">
                <div style={{padding: '20px'}}>
                  {/* MultiSelect */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Amenities</Label>
                    <MultiSelect
                      data={amenitiesList}
                      value={formData.amenities}
                      onChange={(e) => setFormData({...formData, amenities: e.value as string[]})}
                      style={{width: '100%'}}
                      placeholder="Select amenities..."
                    />
                  </div>

                  {/* ChipList */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Special Tags</Label>
                    <ChipList
                      data={chipData}
                      selection="multiple"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.value as ChipDataItem[]})}
                      textField="text"
                      valueField="value"
                    />
                  </div>

                  {/* AutoComplete */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Search Keywords</Label>
                    <AutoComplete
                      data={['luxury', 'budget', 'family-friendly', 'business', 'romantic', 'pet-friendly']}
                      value={formData.keywords}
                      onChange={(e) => setFormData({...formData, keywords: e.value as string || ''})}
                      style={{width: '100%'}}
                      placeholder="Type keywords..."
                    />
                  </div>

                  {/* ColorPicker */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Theme Color</Label>
                    <ColorPicker
                      value={formData.themeColor}
                      onChange={(e) => setFormData({...formData, themeColor: e.value})}
                      view="gradient"
                    />
                  </div>
                </div>
              </TabStripTab>

              <TabStripTab title="Images">
                <div style={{padding: '20px'}}>
                  {/* Upload */}
                  <div style={{marginBottom: '20px'}}>
                    <Label>Upload Images</Label>
                    <Upload
                      batch={false}
                      multiple
                      defaultFiles={[]}
                      withCredentials={false}
                      saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                      removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                    />
                  </div>
                </div>
              </TabStripTab>
            </TabStrip>

            {/* Buttons */}
            <div style={{marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <Button type="button" themeColor="secondary">
                Cancel
              </Button>
              <Button type="button" themeColor="info">
                Preview
              </Button>
              <Button type="submit" themeColor="primary">
                Save Changes
              </Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};


const mapStateToProps = (state: AppState) => ({
  currentOffer: state.offerState.currentOffer!,
  isAuthorized: state.authState.isAuthorized,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setCurrentOffer: (id: number) => dispatch(actions.setCurrentOffer(id)),
});

export const OfferEditPage = connect(mapStateToProps, mapDispatchToProps)(OfferEditPageComponent);
