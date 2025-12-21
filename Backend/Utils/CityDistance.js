const cityDistance = {
  Delhi: {
    Mumbai: 1400,
    Bangalore: 2150,
    Chennai: 2200,
    Hyderabad: 1550,
    Kolkata: 1500,
  },
  Mumbai: {
    Delhi: 1400,
    Bangalore: 980,
    Chennai: 1330,
    Hyderabad: 710,
    Kolkata: 1960,
  },
  Bangalore: {
    Delhi: 2150,
    Mumbai: 980,
    Chennai: 350,
    Hyderabad: 570,
    Kolkata: 1870,
  },
  Chennai: {
    Delhi: 2200,
    Mumbai: 1330,
    Bangalore: 350,
    Hyderabad: 630,
    Kolkata: 1660,
  },
  Hyderabad: {
    Delhi: 1550,
    Mumbai: 710,
    Bangalore: 570,
    Chennai: 630,
    Kolkata: 1500,
  },
  Kolkata: {
    Delhi: 1500,
    Mumbai: 1960,
    Bangalore: 1870,
    Chennai: 1660,
    Hyderabad: 1500,
  },
};

module.exports = cityDistance;
