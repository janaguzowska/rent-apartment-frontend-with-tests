import React, {useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Rating,
  Select,
  SelectChangeEvent,
  Slider,
  Snackbar,
  SnackbarContent,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import {NewOffer} from '../types/Offer.ts';
import {Amenity} from '../types/Amenity.ts';
import {OFFER_TYPES, OfferType} from '../types/OfferType.ts';
import {IMAGE_URL} from '../const.ts';

const OfferAddPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  // const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<NewOffer>({
    title: '',
    description: '',
    city: undefined,
    price: 0,
    type: 'apartment' as OfferType,
    bedrooms: 1,
    maxAdults: 2,
    hasPets: false,
    isPremium: false,
    rating: 5,
    amenities: [] as Amenity[],
    previewImage: undefined,
    images: [],
    isFavorite: false,
    children: 0,
  });

  const steps = ['Informacje Podstawowe', 'Szczegóły Nieruchomości', 'Udogodnienia', 'Podsumowanie'];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name ]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePriceChange = (_e: Event, newValue: number | number[]) => {
    setFormData((prev) => ({
      ...prev,
      price: newValue as number,
    }));
  };

  const handleRatingChange = (_e: React.SyntheticEvent, value: number | null) => {
    if (value !== null) {
      setFormData((prev) => ({
        ...prev,
        rating: value,
      }));
    }
  };

  const handleAddImage = () => {
    const newImage = formData.previewImage;
    if (newImage && !formData?.images.includes(newImage)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
        previewImage: undefined,
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      // Symulacja wysyłania danych
      setTimeout(() => {
        setSuccessMessage('Oferta została pomyślnie utworzona!');
        setOpenSnackbar(true);
        setIsLoading(false);
        // Reset formularza
        setFormData({
          title: '',
          description: '',
          city: undefined,
          price: 0,
          type: 'apartment',
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
        });
        setActiveStep(0);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfoStep formData={formData} onChange={handleInputChange} onSelectChange={handleSelectChange} />;
      case 1:
        return <PropertyDetailsStep formData={formData} onChange={handleInputChange} onCheckboxChange={handleCheckboxChange} onPriceChange={handlePriceChange} onRatingChange={handleRatingChange} />;
      case 2:
        return <ImagesStep formData={formData} onImageChange={handleInputChange} onAddImage={handleAddImage} onRemoveImage={handleRemoveImage} />;
      case 3:
        return <SummaryStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            Dodaj nową ofertę
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Alert Info */}
        <Alert severity="info" sx={{ mb: 4 }} icon={<InfoIcon />}>
          <AlertTitle>Informacja</AlertTitle>
          Wypełnij formularz w kolejnych krokach, aby utworzyć nową ofertę nieruchomości.
        </Alert>

        {/* Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Progress Bar */}
        <LinearProgress variant="determinate" value={(activeStep + 1) * 25} sx={{ mb: 3 }} />

        {/* Form Content */}
        <Box sx={{ mb: 4, minHeight: '400px' }}>
          {renderStepContent()}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBackStep}
            variant="outlined"
            size="large"
          >
            Wstecz
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleOpenDialog}
              variant="contained"
              color="success"
              size="large"
              startIcon={<SaveIcon />}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Utwórz ofertę'}
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              variant="contained"
              size="large"
            >
              Dalej
            </Button>
          )}
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Potwierdzenie</DialogTitle>
        <DialogContent>
          <Typography>Czy na pewno chcesz utworzyć tę ofertę?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button onClick={() => {
            handleCloseDialog(); handleSubmit();
          }} variant="contained" color="success"
          >
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarContent
          message={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon sx={{ color: 'white' }} />
              {successMessage}
            </Box>
          }
          sx={{ backgroundColor: '#4caf50' }}
        />
      </Snackbar>
    </Container>
  );
};

// Krok 1: Informacje Podstawowe
const BasicInfoStep: React.FC<{
  formData: NewOffer;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void;
  onSelectChange: (e: SelectChangeEvent) => void;
}> = ({ formData, onChange, onSelectChange }) => (
  <Grid container spacing={3}>
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardHeader title="Informacje Podstawowe" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Tytuł oferty"
                name="title"
                value={formData.title}
                onChange={onChange}
                variant="outlined"
                helperText="Wpisz atrakcyjny tytuł oferty"
                inputProps={{
                  maxLength: 100,
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <FormControl fullWidth>
                <InputLabel>Miasto</InputLabel>
                <Select
                  name="city"
                  value={formData.city?.title}
                  onChange={onSelectChange}
                  label="Miasto"
                >
                  <MenuItem value="Amsterdam">Amsterdam</MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                  <MenuItem value="London">London</MenuItem>
                  <MenuItem value="Berlin">Berlin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Typ nieruchomości</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={onSelectChange}
                  label="Typ nieruchomości"
                >
                  {OFFER_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12}}>
              <TextField
                fullWidth
                label="Opis"
                name="description"
                value={formData.description}
                onChange={onChange}
                variant="outlined"
                multiline
                rows={4}
                helperText="Wpisz szczegółowy opis nieruchomości"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

// Krok 2: Szczegóły Nieruchomości
const PropertyDetailsStep: React.FC<{
  formData: NewOffer;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (e: Event, newValue: number | number[]) => void;
  onRatingChange: (e: React.SyntheticEvent, value: number | null) => void;
}> = ({ formData, onChange, onCheckboxChange, onPriceChange, onRatingChange }) => (
  <Grid container spacing={3}>
    {/* Cena i Cechy */}
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardHeader title="Cena i Pojemność" />
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography gutterBottom>Cena za noc: €{formData.price}</Typography>
              <Slider
                name="price"
                value={formData.price}
                onChange={onPriceChange}
                min={10}
                max={500}
                step={10}
                marks={[
                  { value: 10, label: '€10' },
                  { value: 250, label: '€250' },
                  { value: 500, label: '€500' },
                ]}
              />
              <FormHelperText>Ustaw czynsze za noc</FormHelperText>
            </Box>

            <TextField
              fullWidth
              type="number"
              label="Liczba sypialni"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={onChange}
              inputProps={{
                inputProps: { min: 1, max: 10 },
              }}
            />

            <TextField
              fullWidth
              type="number"
              label="Maksimum dorosłych"
              name="maxAdults"
              value={formData.maxAdults}
              onChange={onChange}
              inputProps={{
                inputProps: { min: 1, max: 20 },
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>

    {/* Ustawienia i Ocena */}
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardHeader title="Ustawienia i Ocena" />
        <CardContent>
          <Stack spacing={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={onCheckboxChange}
                  />
                }
                label="Oferta Premium"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="hasPets"
                    checked={formData.hasPets}
                    onChange={onCheckboxChange}
                  />
                }
                label="Pozwala na zwierzęta"
              />
            </FormGroup>

            <Divider />

            <Box>
              <Typography component="legend" gutterBottom>
                  Ocena:
              </Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={onRatingChange}
                size="large"
              />
            </Box>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Więcej opcji</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Wyświetl w rekomendacjach"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Aktywna oferta"
                    defaultChecked
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

// Krok 3: Zdjęcia
const ImagesStep: React.FC<{
  formData: NewOffer;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}> = ({ formData, onImageChange, onAddImage, onRemoveImage }) => (
  <Grid container spacing={3}>
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardHeader title="Zdjęcia Nieruchomości" />
        <CardContent>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="URL zdjęcia"
                value={formData.previewImage}
                onChange={onImageChange}
                name="previewImage"
                variant="outlined"
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhotoCameraIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Tooltip title="Dodaj zdjęcie">
                <Button
                  variant="contained"
                  onClick={onAddImage}
                  startIcon={<AddIcon />}
                >
                    Dodaj
                </Button>
              </Tooltip>
            </Box>

            {formData.images.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Dodane zdjęcia ({formData.images.length})
                </Typography>
                <ImageList sx={{ width: '100%', height: 300 }} cols={3}>
                  {formData.images.map((image, index) => (
                    <ImageListItem key={image.name}>
                      <img
                        src={`${IMAGE_URL}/${image.name}.jpg`}
                        alt={`Preview ${index}`}
                        loading="lazy"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                      <ImageListItemBar
                        title={`Zdjęcie ${index + 1}`}
                        actionIcon={
                          <Tooltip title="Usuń zdjęcie">
                            <Button
                              onClick={() => onRemoveImage(index)}
                              size="small"
                              sx={{ color: 'white' }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}

            {formData.images.length === 0 && (
              <Alert severity="warning">
                  Dodaj co najmniej jedno zdjęcie nieruchomości
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

// Krok 4: Podsumowanie
const SummaryStep: React.FC<{ formData: NewOffer }> = ({ formData }) => (
  <Grid container spacing={3}>
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardHeader title="Podsumowanie Oferty" />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Tytuł"
                secondary={formData.title || 'Nie podano'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Miasto"
                secondary={formData.city?.title}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Typ nieruchomości"
                secondary={formData.type}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Cena za noc"
                secondary={`€${formData.price}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Liczba sypialni"
                secondary={formData.bedrooms}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Maksimum dorosłych"
                secondary={formData.maxAdults}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Zezwolenie na zwierzęta"
                secondary={
                  <Chip
                    label={formData.hasPets ? 'TAK' : 'NIE'}
                    color={formData.hasPets ? 'success' : 'error'}
                    size="small"
                  />
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Oferta Premium"
                secondary={
                  <Chip
                    label={formData.isPremium ? 'TAK' : 'NIE'}
                    color={formData.isPremium ? 'primary' : 'default'}
                    size="small"
                  />
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Ocena"
                secondary={<Rating value={formData.rating} readOnly />}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Liczba zdjęć"
                secondary={
                  <Chip
                    label={`${formData.images.length} zdjęć`}
                    variant="outlined"
                  />
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default OfferAddPage;
